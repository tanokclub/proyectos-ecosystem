# Ecosystem · Catálogo — App nativa Android

**Paquete:** `com.tanokclub.ecosystem`
**Tipo:** Capacitor wrap + AAB firmado (clave SpineDab) · targetSdk 35
**AAB release:** `dist/*-release.aab`

**Web pública:** https://tanokclub.github.io/proyectos-ecosystem/

## Descripción
Catálogo de proyectos del ecosistema.

## Compilar AAB
```bash
cd mobile
npm install
npx cap sync android
cd android && ./gradlew bundleRelease
# salida: android/app/build/outputs/bundle/release/app-release.aab
```
