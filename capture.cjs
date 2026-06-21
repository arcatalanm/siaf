const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  const outputDir = path.join(__dirname, 'vistas_siaf');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  // Configurar un viewport grande y limpio para las presentaciones de diseño
  await page.setViewport({ width: 1440, height: 900 });

  const htmlPath = 'file:///' + path.join(__dirname, 'dist', 'index.html').replace(/\\/g, '/');
  console.log('Cargando prototipo desde:', htmlPath);
  await page.goto(htmlPath, { waitUntil: 'networkidle0' });

  // Función auxiliar para esperar un poco
  const delay = ms => new Promise(res => setTimeout(res, ms));

  // 1. Login Ciudadano
  console.log('Capturando: 01_login_ciudadano');
  await page.screenshot({ path: path.join(outputDir, '01_login_ciudadano.png'), fullPage: true });

  // 2. Login Funcionario
  console.log('Capturando: 02_login_funcionario');
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const btn = buttons.find(b => b.textContent.includes('Soy Funcionario'));
    if (btn) btn.click();
  });
  await delay(500);
  await page.screenshot({ path: path.join(outputDir, '02_login_funcionario.png'), fullPage: true });

  // Restaurar y navegar a Recuperar
  await page.goto(htmlPath, { waitUntil: 'networkidle0' });
  console.log('Capturando: 03_recuperar_contrasena');
  await page.evaluate(() => window.setSiafView('recuperar'));
  await delay(500);
  await page.screenshot({ path: path.join(outputDir, '03_recuperar_contrasena.png'), fullPage: true });

  // 4. Registro Usuario
  console.log('Capturando: 04_registro_usuario');
  await page.evaluate(() => window.setSiafView('registro-usuario'));
  await delay(500);
  await page.screenshot({ path: path.join(outputDir, '04_registro_usuario.png'), fullPage: true });

  // 5. Clave Única
  console.log('Capturando: 05_clave_unica');
  await page.evaluate(() => window.setSiafView('clave-unica'));
  await delay(500);
  await page.screenshot({ path: path.join(outputDir, '05_clave_unica.png'), fullPage: true });

  // 6. Dashboard Ciudadano
  console.log('Capturando: 06_dashboard_ciudadano');
  await page.evaluate(() => {
    window.setSiafUserType('ciudadano');
    window.setSiafView('dashboard');
  });
  await delay(500);
  await page.screenshot({ path: path.join(outputDir, '06_dashboard_ciudadano.png'), fullPage: true });

  // 6b. Dashboard Ayuda (Modal de ayuda abierto)
  console.log('Capturando: 06_dashboard_ayuda');
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const btn = buttons.find(b => b.textContent.includes('Ayuda'));
    if (btn) btn.click();
  });
  await delay(500);
  await page.screenshot({ path: path.join(outputDir, '06_dashboard_ayuda.png'), fullPage: true });

  // Ocultar modal de ayuda volviendo al dashboard
  await page.evaluate(() => {
    window.setSiafView('dashboard');
  });
  await delay(200);

  // 7. Registro Vehículo
  console.log('Capturando: 07_registro_vehiculo');
  await page.evaluate(() => {
    window.setSiafHasPets(true);
    window.setSiafVehicle({
      patente: 'AB-CD-12',
      pais: 'Chile',
      marca: 'Toyota',
      modelo: 'RAV4',
      anio: '2024',
      vin: '1HGCR2F83HA000000'
    });
    window.setSiafView('vehiculo');
  });
  await delay(500);
  await page.screenshot({ path: path.join(outputDir, '07_registro_vehiculo.png'), fullPage: true });

  // 8. Registro Grupo
  console.log('Capturando: 08_registro_grupo');
  await page.evaluate(() => {
    window.setSiafMinors([
      { id: '1', nombre: 'Lucas Pérez', rut: '25.123.456-7', edad: '10' }
    ]);
    window.setSiafView('grupo');
  });
  await delay(500);
  await page.screenshot({ path: path.join(outputDir, '08_registro_grupo.png'), fullPage: true });

  // 9. Declaración SAG
  console.log('Capturando: 09_declaracion_sag');
  await page.evaluate(() => {
    window.setSiafSagData(true, 'Manzanas y Naranjas', false, '');
    window.setSiafView('declaracion-sag');
  });
  await delay(500);
  await page.screenshot({ path: path.join(outputDir, '09_declaracion_sag.png'), fullPage: true });

  // 10. Registro Mascotas
  console.log('Capturando: 10_registro_mascotas');
  await page.evaluate(() => {
    window.setSiafMascotaData({
      nombre: 'Rocky',
      tipo: 'Perro',
      raza: 'Golden Retriever',
      microchip: '981020003004005',
      certificado: 'CERT-2024-88A',
      origen: 'Argentina'
    });
    window.setSiafView('registro-mascotas');
  });
  await delay(500);
  await page.screenshot({ path: path.join(outputDir, '10_registro_mascotas.png'), fullPage: true });

  // 11. Declaración Mercancías
  console.log('Capturando: 11_declaracion_mercancias');
  await page.evaluate(() => {
    window.setSiafMercancias([
      { id: '1', descripcion: 'PlayStation 5 Slim', cantidad: 1, valor: 499 }
    ]);
    window.setSiafView('declaracion-mercancias');
  });
  await delay(500);
  await page.screenshot({ path: path.join(outputDir, '11_declaracion_mercancias.png'), fullPage: true });

  // 12. Comprobante Final
  console.log('Capturando: 12_comprobante_final');
  await page.evaluate(() => {
    window.setSiafTipoTramite('vehiculo');
    window.setSiafView('comprobante');
  });
  await delay(500);
  await page.screenshot({ path: path.join(outputDir, '12_comprobante_final.png'), fullPage: true });

  // 13. Funcionario Panel
  console.log('Capturando: 13_funcionario_panel');
  await page.evaluate(() => {
    window.setSiafUserType('funcionario');
    window.setSiafView('panel');
  });
  await delay(500);
  await page.screenshot({ path: path.join(outputDir, '13_funcionario_panel.png'), fullPage: true });

  // 14. Funcionario Inspección
  console.log('Capturando: 14_funcionario_inspeccion');
  await page.evaluate(() => {
    window.setSiafView('inspeccion');
  });
  await delay(500);
  await page.screenshot({ path: path.join(outputDir, '14_funcionario_inspeccion.png'), fullPage: true });

  // 15. Funcionario Auditoría
  console.log('Capturando: 15_funcionario_auditoria');
  await page.evaluate(() => {
    window.setSiafView('auditoria');
  });
  await delay(500);
  await page.screenshot({ path: path.join(outputDir, '15_funcionario_auditoria.png'), fullPage: true });

  console.log('Cerrando navegador...');
  await browser.close();
  console.log('¡Capturas de pantalla generadas exitosamente en vistas_siaf/!');
})();
