$featuresPath = ".\lib\features"

$folders = @(
    "domain\entities",
    "domain\repositories",

    "application\use_cases",
    "application\providers",

    "infrastructure\datasources",
    "infrastructure\models",
    "infrastructure\repositories",

    "presentation\pages",
    "presentation\widgets",
    "presentation\controllers"
)

Get-ChildItem $featuresPath -Directory | ForEach-Object {

    $featurePath = $_.FullName
    $featureName = $_.Name

    Write-Host "Configurando feature: $featureName"

    foreach ($folder in $folders) {
        New-Item `
            -ItemType Directory `
            -Force `
            -Path (Join-Path $featurePath $folder) `
            | Out-Null
    }

    Write-Host "OK: $featureName"
}

Write-Host ""
Write-Host "Estructura de features creada correctamente."