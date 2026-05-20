import { test, expect } from '@playwright/test';

test('Sign in', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  await page.getByTestId('signInButton').click();

  await page.getByLabel('Email').fill('john@test.com');
  await page.getByLabel('Пароль').fill('test123');
  await page.getByTestId('signInOrSignUpButton').click();

  await expect(page.getByTestId('signOutButton')).toBeVisible();
});

test('Sign up', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  await page.getByTestId('signInButton').click();

  await page.getByTestId('registerButton').click();
  await page.getByLabel('Имя').fill('Test');
  await page.getByLabel('Email').fill(`${Date.now()}@test.com`);
  await page.getByLabel('Пароль:', { exact: true }).fill('test123');
  await page.getByLabel('Повторите пароль:', { exact: true }).fill('test123');
  await page.getByTestId('signInOrSignUpButton').click();

  await expect(page.getByTestId('signOutButton')).toBeVisible();
});

test('Make order with login', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByTestId('catCard_0').getByTestId('addToCartButton').click();
  await page.getByTestId('catModalAddToCartButton').click();
  await page.getByTestId('openCartButton').click();
  await page.getByTestId('goToCartPageButton').click();
  await page.getByTestId('makeOrderButton').click();

  await page.getByLabel('Email').fill('john@test.com');
  await page.getByLabel('Пароль').fill('test123');
  await page.getByTestId('signInOrSignUpButton').click();

  await page.getByLabel('Город').fill('Test city');
  await page.getByLabel('Улица').fill('Test street');
  await page.getByLabel('Дом').fill('1');
  await page.getByLabel('Квартира').fill('1');
  await page.getByLabel('Комментарий курьеру').fill('Test comment');
  await page.getByTestId('approveOrder').click();

  await expect(page.getByTestId('modalTitle')).toHaveText('Заказ оформлен');
  await page.getByTestId('closeSubmittedModalButton').click();

  await page.getByTestId('openOrdersButton').click();
  await expect(page.getByTestId('ordersList').getByRole('listitem').first()).toBeVisible();
});

test('Make order', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  await page.getByTestId('signInButton').click();

  await page.getByLabel('Email').fill('john@test.com');
  await page.getByLabel('Пароль').fill('test123');
  await page.getByTestId('signInOrSignUpButton').click();

  await expect(page.getByTestId('signOutButton')).toBeVisible();

  await page.getByTestId('catCard_0').getByTestId('addToCartButton').click();
  await page.getByTestId('catModalAddToCartButton').click();
  await page.getByTestId('openCartButton').click();
  await page.getByTestId('goToCartPageButton').click();
  await page.getByTestId('makeOrderButton').click();

  await page.getByLabel('Город').fill('Test city');
  await page.getByLabel('Улица').fill('Test street');
  await page.getByLabel('Дом').fill('1');
  await page.getByLabel('Квартира').fill('1');
  await page.getByLabel('Комментарий курьеру').fill('Test comment');
  await page.getByTestId('approveOrder').click();

  await expect(page.getByTestId('modalTitle')).toHaveText('Заказ оформлен');
  await page.getByTestId('closeSubmittedModalButton').click();

  await page.getByTestId('openOrdersButton').click();
  await expect(page.getByTestId('ordersList').getByRole('listitem').first()).toBeVisible();
});
