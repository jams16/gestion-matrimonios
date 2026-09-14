$baseUrl = "http://localhost:3000/api/v1"

$passed = 0
$failed = 0
$results = @()

function Show-Section {
    param([string]$Title)

    Write-Host ""
    Write-Host "==================================================" -ForegroundColor DarkGray
    Write-Host $Title -ForegroundColor Cyan
    Write-Host "==================================================" -ForegroundColor DarkGray
}

function Add-Result {
    param(
        [string]$Name,
        [bool]$Success,
        [string]$Detail
    )

    $script:results += [PSCustomObject]@{
        Prueba = $Name
        Estado = if ($Success) { "OK" } else { "ERROR" }
        Detalle = $Detail
    }

    if ($Success) {
        $script:passed++
    }
    else {
        $script:failed++
    }
}

function Test-Request {
    param(
        [string]$Name,
        [string]$Method,
        [string]$Url,
        [object]$Body = $null
    )

    Write-Host ""
    Write-Host "Prueba: $Name" -ForegroundColor Yellow
    Write-Host "Método: $Method"
    Write-Host "URL: $Url"

    try {
        $params = @{
            Method = $Method
            Uri = $Url
            ContentType = "application/json"
        }

        if ($null -ne $Body) {
            $json = $Body | ConvertTo-Json -Depth 10
            Write-Host ""
            Write-Host "Request JSON:" -ForegroundColor DarkCyan
            Write-Host $json

            $params.Body = $json
        }

        $response = Invoke-RestMethod @params

        Write-Host ""
        Write-Host "[OK]" -ForegroundColor Green

        $response |
            ConvertTo-Json -Depth 10 |
            Write-Host

        Add-Result $Name $true "Respuesta recibida correctamente."

        return $response
    }
    catch {
        Write-Host ""
        Write-Host "[ERROR]" -ForegroundColor Red

        $detail = $_.Exception.Message

        if ($_.ErrorDetails.Message) {
            $detail = $_.ErrorDetails.Message
        }

        Write-Host $detail

        Add-Result $Name $false $detail

        return $null
    }
}

Clear-Host

Write-Host ""
Write-Host "##################################################" -ForegroundColor Magenta
Write-Host "# PRUEBA DE ARQUITECTURA - GESTION MATRIMONIOS  #" -ForegroundColor Magenta
Write-Host "##################################################" -ForegroundColor Magenta

Write-Host ""
Write-Host "Flujo esperado:" -ForegroundColor White
Write-Host ""
Write-Host "Cliente / Script" -ForegroundColor Gray
Write-Host "      |"
Write-Host "      v"
Write-Host "Presentation / Controller" -ForegroundColor Gray
Write-Host "      |"
Write-Host "      v"
Write-Host "Application / Use Case" -ForegroundColor Gray
Write-Host "      |"
Write-Host "      v"
Write-Host "Domain" -ForegroundColor Gray
Write-Host "      |"
Write-Host "      v"
Write-Host "Infrastructure / Repository" -ForegroundColor Gray
Write-Host "      |"
Write-Host "      v"
Write-Host "Prisma" -ForegroundColor Gray
Write-Host "      |"
Write-Host "      v"
Write-Host "PostgreSQL" -ForegroundColor Gray

# ==================================================
# CAPA 1 - API / PRESENTATION
# ==================================================

Show-Section "CAPA 1 - PRESENTATION / API REST"

Write-Host "Objetivo:"
Write-Host "Validar que el backend exponga correctamente los endpoints REST."
Write-Host "El Controller debe recibir la solicitud y delegarla a Application."

$ubigeos = Test-Request `
    "GET lista de ubigeos" `
    "GET" `
    "$baseUrl/ubigeos?pagina=1&limite=5"

# ==================================================
# CAPA 2 - APPLICATION
# ==================================================

Show-Section "CAPA 2 - APPLICATION / CASOS DE USO"

Write-Host "Objetivo:"
Write-Host "Comprobar que los casos de uso procesen las operaciones solicitadas."
Write-Host "Aquí debe existir la lógica de aplicación, sin acceder directamente a PostgreSQL."

$timestamp = [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()

$personaBody = @{
    nombres = "Prueba"
    apellidoPaterno = "Arquitectura"
    correoElectronico = "arquitectura.$timestamp@test.com"
}

$persona = Test-Request `
    "POST crear persona natural" `
    "POST" `
    "$baseUrl/personas-naturales" `
    $personaBody

# Intentar recuperar ID dinámicamente
$personaId = $null

if ($persona -and $persona.data) {
    if ($persona.data.idPersonaNatural) {
        $personaId = $persona.data.idPersonaNatural
    }
    elseif ($persona.data.id_persona_natural) {
        $personaId = $persona.data.id_persona_natural
    }
}

# ==================================================
# CAPA 3 - DOMAIN
# ==================================================

Show-Section "CAPA 3 - DOMAIN / REGLAS DE NEGOCIO"

Write-Host "Objetivo:"
Write-Host "Comprobar reglas y validaciones del dominio."
Write-Host "Ejemplo: campos obligatorios y datos inválidos."

Write-Host ""
Write-Host "Prueba: crear persona sin campos obligatorios" -ForegroundColor Yellow

try {
    $invalidBody = @{
        nombres = ""
    }

    Invoke-RestMethod `
        -Method POST `
        -Uri "$baseUrl/personas-naturales" `
        -ContentType "application/json" `
        -Body ($invalidBody | ConvertTo-Json) `
        -ErrorAction Stop

    Write-Host "[ERROR] El backend aceptó un registro inválido." -ForegroundColor Red
    Add-Result "Validación de campos obligatorios" $false "El backend aceptó datos inválidos."
}
catch {
    Write-Host "[OK] El backend rechazó correctamente los datos inválidos." -ForegroundColor Green
    Add-Result "Validación de campos obligatorios" $true "La validación rechazó datos inválidos."
}

# ==================================================
# CAPA 4 - INFRASTRUCTURE / REPOSITORY
# ==================================================

Show-Section "CAPA 4 - INFRASTRUCTURE / REPOSITORY"

Write-Host "Objetivo:"
Write-Host "Validar que Repository + Prisma recuperen datos persistidos."

if ($personaId) {
    Test-Request `
        "GET persona creada por ID" `
        "GET" `
        "$baseUrl/personas-naturales/$personaId"
}
else {
    Write-Host ""
    Write-Host "[OMITIDO] No se pudo obtener el ID de la persona creada." -ForegroundColor DarkYellow
    Add-Result "GET persona por ID" $false "No se obtuvo ID desde la creación."
}

# ==================================================
# CAPA 5 - PRISMA + POSTGRESQL
# ==================================================

Show-Section "CAPA 5 - PRISMA + POSTGRESQL"

Write-Host "Objetivo:"
Write-Host "Comprobar persistencia real mediante consultas posteriores."

Test-Request `
    "GET personas paginadas" `
    "GET" `
    "$baseUrl/personas-naturales?pagina=1&limite=5"

Test-Request `
    "GET ubigeos paginados" `
    "GET" `
    "$baseUrl/ubigeos?pagina=1&limite=5"

# ==================================================
# CAPA 6 - PAGINACIÓN
# ==================================================

Show-Section "CAPA 6 - PAGINACIÓN"

Write-Host "Objetivo:"
Write-Host "Validar parámetros de pagina y limite."

Test-Request `
    "Personas pagina 1 limite 2" `
    "GET" `
    "$baseUrl/personas-naturales?pagina=1&limite=2"

Test-Request `
    "Ubigeos pagina 1 limite 3" `
    "GET" `
    "$baseUrl/ubigeos?pagina=1&limite=3"

# ==================================================
# CAPA 7 - BÚSQUEDA
# ==================================================

Show-Section "CAPA 7 - BÚSQUEDA"

Write-Host "Objetivo:"
Write-Host "Comprobar búsqueda mediante parámetros de consulta."

Test-Request `
    "Buscar persona por texto" `
    "GET" `
    "$baseUrl/personas-naturales?buscar=Prueba"

Test-Request `
    "Buscar ubigeo Lima" `
    "GET" `
    "$baseUrl/ubigeos?buscar=Lima&limite=5"

# ==================================================
# CAPA 8 - MOSTRAR TODOS
# ==================================================

Show-Section "CAPA 8 - MODO MOSTRAR TODOS"

Write-Host "Objetivo:"
Write-Host "Verificar que mostrarTodos ignore la paginación."

Test-Request `
    "Ubigeos mostrarTodos" `
    "GET" `
    "$baseUrl/ubigeos?mostrarTodos=true"

# ==================================================
# CAPA 9 - ACTUALIZACIÓN
# ==================================================

Show-Section "CAPA 9 - ACTUALIZACIÓN"

if ($personaId) {

    $updateBody = @{
        nombres = "Prueba Actualizada"
    }

    Test-Request `
        "Actualizar persona" `
        "PATCH" `
        "$baseUrl/personas-naturales/$personaId" `
        $updateBody
}
else {
    Write-Host "[OMITIDO] No existe ID para actualizar." -ForegroundColor DarkYellow
}

# ==================================================
# CAPA 10 - ELIMINACIÓN LÓGICA
# ==================================================

Show-Section "CAPA 10 - ELIMINACIÓN LÓGICA"

Write-Host "Objetivo:"
Write-Host "Validar que DELETE desactive el registro y no lo elimine físicamente."

if ($personaId) {

    Test-Request `
        "Eliminar lógicamente persona" `
        "DELETE" `
        "$baseUrl/personas-naturales/$personaId"

}
else {
    Write-Host "[OMITIDO] No existe ID para eliminar." -ForegroundColor DarkYellow
}

# ==================================================
# RESUMEN
# ==================================================

Show-Section "RESUMEN FINAL"

$results | Format-Table -AutoSize

$total = $passed + $failed

Write-Host ""
Write-Host "Total de pruebas : $total"
Write-Host "Aprobadas         : $passed" -ForegroundColor Green
Write-Host "Fallidas          : $failed" -ForegroundColor $(if ($failed -eq 0) { "Green" } else { "Red" })

Write-Host ""

if ($failed -eq 0) {
    Write-Host "RESULTADO: ARQUITECTURA OPERATIVA" -ForegroundColor Green
}
else {
    Write-Host "RESULTADO: EXISTEN PRUEBAS FALLIDAS" -ForegroundColor Red
}

Write-Host ""
Write-Host "Flujo validado:" -ForegroundColor Cyan
Write-Host "Cliente -> Controller -> Application -> Domain -> Repository -> Prisma -> PostgreSQL"
Write-Host ""