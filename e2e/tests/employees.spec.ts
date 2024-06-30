import { test, expect } from '@playwright/test';

test('employees', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Employees Management | Welcome/);
  await expect(page.getByText(/Welcome to the app!/)).toBeVisible();
  await page.getByRole('button', { name: /Get started/ }).click();

  // Navigate employee page
  await page.goto('/employees');
  await expect(page).toHaveTitle(/Employees Management | List employees/);
  await page.getByRole('button', { name: /Add employee/ }).click();

  // Create employee
  await page.goto('/employees/new');
  await expect(page).toHaveTitle(/Employees Management | New employee/);

  await page.getByLabel(/Name/).fill('Alex');
  await page
    .getByPlaceholder(/Please input description/)
    .fill('This is my first job');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.goto('/employees');
  await expect(page.getByText(/Alex/)).toBeVisible();

  // Update employee
  await page.getByText('Alex').click();
  await page
    .getByPlaceholder(/Please input description/)
    .fill('This is my first job! I learn a lot here');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.goto('/employees');
  await expect(
    page.getByText(/This is my first job! I learn a lot here/),
  ).toBeVisible();

  // Delete Todo
  await page.getByTestId('delete-btn').click();
  await expect(page.getByText('Alex')).toBeHidden();
});
