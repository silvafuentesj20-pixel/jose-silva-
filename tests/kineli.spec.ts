import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('página accesible, reserva validada y contacto sin datos sensibles', async ({ page, context }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await context.route('https://wa.me/**', route => route.fulfill({ body: 'WhatsApp simulado' }));
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('nuestro compromiso');
  await expect(page.locator('canvas')).toHaveCount(0);
  const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  expect(result.violations).toEqual([]);
  await page.getByRole('button', { name: 'Continuar a WhatsApp' }).click();
  await expect(page.getByText('Elige una especialidad.')).toBeVisible();
  await page.getByLabel('Especialidad', { exact: true }).selectOption('Kinesiología');
  await page.getByRole('checkbox').check();
  await Promise.all([
    page.waitForURL(url => url.hostname === 'wa.me'),
    page.getByRole('button', { name: 'Continuar a WhatsApp' }).click(),
  ]);
  const url = new URL(page.url());
  expect(url.pathname).toBe('/56957375055');
  expect(url.searchParams.get('text')).toBe('Hola, Kineli. Quisiera consultar por una hora de Kinesiología.');
});

test('móvil mantiene el contenido y evita cargar la escena 3D', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto('/');
  await expect(page.getByRole('link', { name: 'Agenda tu hora' }).first()).toBeVisible();
  await expect(page.locator('.wellness-poster')).toBeVisible();
  await expect(page.locator('canvas')).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(360);
  const bytes = await page.evaluate(() => performance.getEntriesByType('resource').reduce((sum, item) => sum + (item as PerformanceResourceTiming).encodedBodySize, 0));
  expect(bytes).toBeLessThan(900_000);
});

test('aviso de privacidad abre y permite volver al formulario', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'aviso de privacidad', exact: true }).first().click();
  await expect(page.getByRole('heading', { name: 'Aviso de privacidad' })).toBeVisible();
  await page.getByRole('link', { name: 'Volver a la solicitud' }).click();
  await expect(page).toHaveURL(/#reserva$/);
});

test('la secuencia de portada se puede recorrer y queda en pausa con movimiento reducido', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const gallery = page.getByRole('region', { name: 'Consejos de bienestar de Kineli' });
  await expect(gallery.getByRole('button', { name: 'Reproducir' })).toBeVisible();
  await gallery.getByRole('button', { name: 'Imagen siguiente' }).click();
  await expect(gallery.getByRole('img')).toHaveAttribute('src', /mente\.webp$/);
  await gallery.getByRole('button', { name: 'Imagen anterior' }).click();
  await expect(gallery.getByRole('img')).toHaveAttribute('src', /cuerpo\.webp$/);
});
