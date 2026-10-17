# AG CORE Services Website

**Tagline:** From Skills to Opportunity.

A beginner-friendly, mobile-responsive website for AG CORE Services. It uses plain HTML, CSS and JavaScript, so you can read and edit the code without installing a framework.

## Features

- Black-and-gold AG CORE branding.
- Mobile-friendly navigation and page layout.
- MTN, Airtel and Glo data plan selector.
- Search by network, plan name, validity or price.
- Filter by validity and sort by price or data size.
- WhatsApp order buttons that include the selected plan, price, validity and recipient phone number.
- Nigerian phone-number validation before preparing an order.
- Flyer gallery with links to open and save each flyer.
- Customer feedback link without fake testimonials.
- FAQ, ordering instructions and contact details.
- Central price list in `plans.js` to make updating plans easier.

## Files and folders

```text
AG_CORE_Services_Website/
├── index.html       # Page content and sections
├── style.css        # Colours, spacing, layout and mobile design
├── script.js        # Filters, plan cards, validation and WhatsApp ordering
├── plans.js         # The editable data-plan and price list
├── README.md        # Project guide
└── assets/          # Logos, promotional image and network flyers
```

## Preview the website

1. Download and extract the ZIP file.
2. Keep `index.html`, `style.css`, `script.js`, `plans.js` and the `assets` folder together.
3. Open `index.html` in a web browser.
4. To test an order, choose a network, enter a Nigerian recipient number and tap **Order on WhatsApp**. WhatsApp opens with a prepared message; the customer still reviews and sends it.

## How to update data prices

1. Open `plans.js` in a code editor such as Visual Studio Code.
2. Find the network section you want to change: `MTN`, `Airtel` or `Glo`.
3. Change the `data`, `price` or `validity` value on the relevant line.
4. To add a plan, copy a line and edit the values. Keep the commas between plan entries.
5. Save the file and refresh the website in your browser.

Example:

```js
{ network: "MTN", data: "1GB", price: 500, validity: "7 days" },
```

Use a number for `price`, without the naira symbol or commas. The website adds the currency formatting for you. Check the current selling price and availability before publishing; the website does not automatically verify prices with mobile networks.

## How to change the WhatsApp number

Open `script.js` and find this line near the top:

```js
const WHATSAPP_NUMBER = "2349120258280";
```

Replace the digits with your business WhatsApp number in international format, without spaces, plus signs or dashes. Keep the quotation marks.

## How to change contact numbers

The displayed call numbers are in `index.html`, inside the section with `id="contact"`. Update both the visible text and the `tel:` link if the numbers change.

## Important limitations

- This is a static website. WhatsApp ordering is prepared by the browser; it is not an automatic data-delivery system.
- It does not collect or process payments.
- Editing `plans.js` changes the website only after the updated files are saved and re-published.
- The prices in `plans.js` are editable guide prices and should be checked against your current business price list before publishing.
- The customer feedback section invites real reviews; it does not invent testimonials.

## Publish with GitHub Pages

1. Upload the contents of this folder to your GitHub repository. The `index.html` file should be in the repository root.
2. Open the repository's **Settings → Pages**.
3. Choose deployment from your selected branch and the repository root, then save.
4. Wait for GitHub Pages to provide the published website address.

## Learning guide

- Start with `index.html` to understand the page sections.
- Read `style.css` to change colours and layouts. The main colours are stored in the `:root` section at the top.
- Read `plans.js` to manage the data plans.
- Read `script.js` to understand filtering, building plan cards and preparing WhatsApp messages.
