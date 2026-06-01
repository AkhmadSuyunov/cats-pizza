import { test } from '../../fixtures/app.fixture';
import { CleanUpApi } from '../api/CleanUpApi';
import { testUsers } from '../data/testData';

test.describe('Auth', () => {
  let createUserEmail: string | null = null;

  test.afterAll(async ({ request }) => {
    if (!createUserEmail) return;

    const cleanupApi = new CleanUpApi(request);
    await cleanupApi.deleteUserByEmail(createUserEmail);

    createUserEmail = null;
  });

  test('Sign in', async ({ homePage, authPage }) => {
    await homePage.open();
    await authPage.singIn(testUsers.existing.email, testUsers.existing.password);
    await authPage.assertSignedIn();
  });

  test('Sign up', async ({ homePage, authPage }) => {
    createUserEmail = `${Date.now()}@test.com`;
    await homePage.open();
    await authPage.singUp('John', createUserEmail, testUsers.existing.password);
    await authPage.assertSignedIn();
  });
});
