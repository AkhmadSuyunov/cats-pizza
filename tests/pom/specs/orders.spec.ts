import { test } from '../../fixtures/app.fixture';
import { CleanUpApi } from '../api/CleanUpApi';
import { testAddress, testUsers } from '../data/testData';

test.describe('Orders', () => {
  test.describe.configure({ mode: 'serial' });
  test.afterEach(async ({ request }) => {
    const cleanupApi = new CleanUpApi(request);
    await cleanupApi.deleteOrdersByEmail(testUsers.existing.email);
  });

  test('Make order with login in checkout', async ({ homePage, checkoutPage, ordersPage }) => {
    await homePage.open();
    await homePage.addFirstCatToCart();
    await homePage.goToCheckoutFromCart();
    await checkoutPage.fillAddress(testAddress);
    await checkoutPage.submit();
    await checkoutPage.signInInCheckout(testUsers.existing.email, testUsers.existing.password);
    await ordersPage.openOrdersBtn();
    await ordersPage.assertHasOrder();
  });

  test('Make order after login', async ({ homePage, authPage, checkoutPage, ordersPage }) => {
    await homePage.open();
    await authPage.singIn(testUsers.existing.email, testUsers.existing.password);
    await authPage.assertSignedIn();
    await homePage.addFirstCatToCart();
    await homePage.goToCheckoutFromCart();
    await checkoutPage.fillAddress(testAddress);
    await checkoutPage.submit();
    await ordersPage.openOrdersBtn();
    await ordersPage.assertHasOrder();
  });
});
