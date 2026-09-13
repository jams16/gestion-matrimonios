$modulesPath = ".\src\modules"

$folders = @(
    "domain\entities",
    "domain\enums",
    "domain\value-objects",
    "domain\repositories",

    "application\dto",
    "application\use-cases",
    "application\ports",

    "infrastructure\persistence\repositories",
    "infrastructure\persistence\mappers",
    "infrastructure\services",

    "presentation\controllers"
)

Get-ChildItem $modulesPath -Directory | ForEach-Object {

    $modulePath = $_.FullName
    $moduleName = $_.Name

    Write-Host "Configurando módulo: $moduleName"

    foreach ($folder in $folders) {
        New-Item `
            -ItemType Directory `
            -Force `
            -Path (Join-Path $modulePath $folder) `
            | Out-Null
    }

    $moduleFile = Join-Path $modulePath "$moduleName.module.ts"

    if (-not (Test-Path $moduleFile)) {
        $className = ($moduleName.Substring(0,1).ToUpper() + $moduleName.Substring(1)) + "Module"

        @"
import { Module } from '@nestjs/common';

@Module({})
export class $className {}
"@ | Set-Content -Encoding UTF8 $moduleFile
    }

    Write-Host "OK: $moduleName"
}

Write-Host ""
Write-Host "Estructura creada correctamente."