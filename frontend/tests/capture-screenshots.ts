import { chromium, type Page } from "playwright";
import fs from "node:fs";
import path from "node:path";

const base = process.env.BASE_URL ?? "http://localhost:3000";
const root = path.join(process.cwd(), "screenshots");

const routes = [
  { path: "/", name: "01-homepage" },
  { path: "/destinations", name: "02-destinations" },
  { path: "/maasai-mara", name: "03-maasai-mara" },
  { path: "/safaris", name: "04-safari-listing" },
  { path: "/safaris/6-day-ngorongoro-serengeti-maasai-mara", name: "05-safari-details" },
  { path: "/plan-safari", name: "06-custom-planner" },
  { path: "/vehicle-hire", name: "07-vehicle-hire" },
  { path: "/kenya-diani-beach", name: "08-diani-beach" },
  { path: "/fly-in-safaris", name: "09-fly-in-safaris" },
  { path: "/photography-safaris", name: "10-photography-safaris" },
  { path: "/luxury-budget-safaris", name: "11-luxury-budget" },
  { path: "/partnerships", name: "12-partnerships" },
  { path: "/about", name: "13-about" },
  { path: "/contact", name: "14-contact" },
];

function isNavigationError(error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  return message.includes("Execution context was destroyed") || message.includes("navigation");
}

async function settle(page: Page) {
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      await settleOnce(page);
      return;
    } catch (error) {
      if (!isNavigationError(error) || attempt === 2) throw error;
      await page.waitForLoadState("domcontentloaded");
    }
  }
}

async function settleOnce(page: Page) {
  await page.waitForLoadState("domcontentloaded");
  await page.waitForSelector("header", { timeout: 30000 });
  await page.evaluate(async () => {
    await document.fonts.ready;
    const height = document.body.scrollHeight;
    const step = window.innerHeight;
    for (let y = 0; y < height; y += step) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 80));
    }
    window.scrollTo(0, 0);
    const images = Array.from(document.images);
    await Promise.all(
      images.map(
        (image) =>
          image.complete
            ? Promise.resolve()
            : Promise.race([
                new Promise((resolve) => {
                  image.addEventListener("load", resolve, { once: true });
                  image.addEventListener("error", resolve, { once: true });
                }),
                new Promise((resolve) => setTimeout(resolve, 4000)),
              ]),
      ),
    );
  });
  await page.waitForTimeout(300);
}

async function assertNoOverflow(page: Page, label: string) {
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      await page.waitForSelector("header", { timeout: 30000 });
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      if (overflow > 2) {
        throw new Error(`${label} overflows by ${overflow}px`);
      }
      return;
    } catch (error) {
      if (!isNavigationError(error) || attempt === 2) throw error;
      await page.waitForLoadState("domcontentloaded");
    }
  }
}

async function shot(page: Page, file: string, options?: { fullPage?: boolean; scroll?: boolean }) {
  if (options?.scroll === false) {
    await page.waitForTimeout(400);
  } else {
    await settle(page);
  }
  await page.screenshot({ path: file, fullPage: options?.fullPage !== false });
  const size = fs.statSync(file).size;
  if (size < 8000) throw new Error(`${file} looks empty (${size} bytes)`);
}

async function main() {
  fs.mkdirSync(path.join(root, "desktop"), { recursive: true });
  fs.mkdirSync(path.join(root, "mobile"), { recursive: true });
  fs.mkdirSync(path.join(root, "interactions"), { recursive: true });

  const browser = await chromium.launch();
  const desktop = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const desktopPage = await desktop.newPage();
  const tablet = await browser.newContext({ viewport: { width: 768, height: 1024 } });
  const tabletPage = await tablet.newPage();

  for (const route of routes) {
    console.log("desktop", route.path);
    await desktopPage.goto(`${base}${route.path}`, { waitUntil: "domcontentloaded", timeout: 60000 });
    await assertNoOverflow(desktopPage, `desktop ${route.path}`);
    await shot(desktopPage, path.join(root, "desktop", `${route.name}-desktop.png`));

    await tabletPage.goto(`${base}${route.path}`, { waitUntil: "domcontentloaded", timeout: 60000 });
    await assertNoOverflow(tabletPage, `tablet ${route.path}`);
  }

  const mobile = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const mobilePage = await mobile.newPage();
  for (const route of routes) {
    await mobilePage.goto(`${base}${route.path}`, { waitUntil: "domcontentloaded", timeout: 60000 });
    await assertNoOverflow(mobilePage, `mobile ${route.path}`);
    await shot(mobilePage, path.join(root, "mobile", `${route.name}-mobile.png`));
  }

  await mobilePage.goto(`${base}/`, { waitUntil: "domcontentloaded", timeout: 60000 });
  await mobilePage.getByTestId("nav-toggle").click();
  await mobilePage.getByTestId("mobile-nav").waitFor();
  await mobilePage.getByTestId("mobile-nav").getByText("Destinations", { exact: true }).click();
  await shot(mobilePage, path.join(root, "interactions", "mobile-navigation.png"), { fullPage: false, scroll: false });

  await desktopPage.goto(`${base}/safaris`, { waitUntil: "domcontentloaded", timeout: 60000 });
  await desktopPage.getByTestId("filter-destination").selectOption("Maasai Mara");
  await shot(desktopPage, path.join(root, "interactions", "safari-filters.png"));

  await desktopPage.goto(`${base}/plan-safari`, { waitUntil: "domcontentloaded", timeout: 60000 });
  await desktopPage.locator('input[type="date"]').nth(0).fill("2027-09-10");
  await desktopPage.locator('input[type="date"]').nth(1).fill("2027-09-20");
  await desktopPage.getByTestId("planner-next").click();
  await desktopPage.getByRole("button", { name: "Maasai Mara", exact: true }).click();
  await desktopPage.getByRole("button", { name: "Amboseli", exact: true }).click();
  await shot(desktopPage, path.join(root, "interactions", "planner-destination-selection.png"));
  await desktopPage.getByTestId("planner-next").click();
  await desktopPage.getByRole("button", { name: "Private", exact: true }).click();
  await desktopPage.getByTestId("planner-next").click();
  await desktopPage.getByRole("button", { name: "Private 4x4 Land Cruiser with driver-guide" }).click();
  await shot(desktopPage, path.join(root, "interactions", "planner-transport-selection.png"));
  await desktopPage.getByTestId("planner-next").click();
  await desktopPage.getByRole("button", { name: "Tented camp", exact: true }).click();
  await desktopPage.getByTestId("planner-next").click();
  const planner = desktopPage.getByTestId("planner-form");
  await planner.getByLabel("Full name").fill("Alex Morgan");
  await planner.getByLabel("Email", { exact: true }).fill("alex@example.com");
  await planner.getByLabel("Country of residence").fill("United Kingdom");
  await planner.getByLabel("Phone or WhatsApp").fill("+447700900123");
  await desktopPage.getByTestId("planner-next").click();
  await desktopPage.getByTestId("planner-review").waitFor();
  await shot(desktopPage, path.join(root, "interactions", "planner-final-review.png"));
  await desktopPage.getByTestId("planner-submit").click();
  await desktopPage.getByTestId("enquiry-confirmation").waitFor();
  await shot(desktopPage, path.join(root, "interactions", "enquiry-confirmation.png"));

  await browser.close();
  console.log("Screenshots written to", root);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
