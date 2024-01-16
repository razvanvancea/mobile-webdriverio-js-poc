let chance = require('chance').Chance();

describe('android elements tests', () => {
	it('Find element by accessibility id', async () => {
		// find element by xpath
		await $('//android.widget.TextView[@content-desc="App"]').click();

		// assertion
		const actionBar = await $('~Action Bar');
		await expect(actionBar).toBeExisting();
	});

	it('find by class name', async () => {
		const className = await $('android.widget.TextView');
		console.log(await className.getText());

		await expect(className).toHaveText('API Demos');
	});

	it('find element by xpath', async () => {
		// xpath - //tagName[@attribute='value']

		await $('//android.widget.TextView[@content-desc="Alert Dialogs"]').click();

		// find by resource-id
		await $(
			'//android.widget.Button[@resource-id="io.appium.android.apis:id/select_button"]'
		).click();

		// find by text
		await $('//android.widget.TextView[@text="Command two"]').click();

		// find by class -- assertion
		const textAssertion = await $('//android.widget.TextView');
		await expect(textAssertion).toHaveText('You selected: 1 , Command two');
	});

	it('find elements using UIAutomator', async () => {
		await $('android=new UiSelector().textContains("Alert")').click();
	});

	it('find multiple elements and extract text', async () => {
		const expectedList = [
			'API Demos',
			'Accessibility',
			'App',
			'Content',
			'Graphics',
			'Media',
			'NFC',
			'OS',
			'Preference',
			'Text',
			'Views',
		];
		const actualList = [];

		// find multiple elements
		const textList = await $$('android.widget.TextView');
		// loop through them
		for (const element of textList) {
			actualList.push(await element.getText());
		}
		// assert the list
		await expect(actualList).toEqual(expectedList);
	});

	it('access an activity directly', async () => {
		await driver.startActivity(
			'io.appium.android.apis',
			'.app.AlertDialogSamples'
		);
		await driver.pause(3000);
		await expect($('//*[@text="App/Alert Dialogs"]')).toExist();
	});

	it('working with dialog/alert', async () => {
		await driver.startActivity(
			'io.appium.android.apis',
			'.app.AlertDialogSamples'
		);
		await $('//*[@resource-id="io.appium.android.apis:id/two_buttons"]').click();

		// get alert text
		console.log('alert text: ', await driver.getAlertText());

		// accept alert
		// await driver.acceptAlert();

		// dismiss alert
		// await driver.dismissAlert();

		// click OK button
		await $('//*[@resource-id="android:id/button1"]').click();

		await expect($('//*[@resource-id="android:id/alertTitle"]')).not.toExist();
	});

	it('vertical scrolling', async () => {
		await $('~App').click();
		await $('~Activity').click();

		// scroll to the end (not stable if element gets moved)
		//1,5 inseamna scrollez o data, dar cu viteza 5
		// await $('android=new UiScrollable(new UiSelector().scrollable(true)).scrollToEnd(1,5)')
		// fara scroll, pica fiindca nu gaseste elementul
		// await $('~Secure Surfaces').click();

		// scroll text into view - more stable
		await $(
			'android=new UiScrollable(new UiSelector().scrollable(true)).scrollTextIntoView("Secure Surfaces")'
		).click();

		await expect($('~Secure Dialog')).toExist();
	});

	it.only('horizontal scrolling', async () => {
		await driver.startActivity('io.appium.android.apis', '.view.Gallery1');

		await $(
			'android=new UiScrollable(new UiSelector().scrollable(true)).setAsHorizontalList().scrollForward()'
		);

		await $(
			'android=new UiScrollable(new UiSelector().scrollable(true)).setAsHorizontalList().scrollBackward()'
		);

		await driver.pause(3000);
	});

	it('type - exercise', async () => {
		await $('~Views').click();
		await $('//android.widget.TextView[@text="Auto Complete"]').click();
		await $('//android.widget.TextView[@content-desc="1. Screen Top"]').click();
		const textField = await $(
			'//*[@resource-id="io.appium.android.apis:id/edit"]'
		);

		const randomCountry = chance.word({ length: 5 });
		await textField.addValue(randomCountry);
		console.log(randomCountry);
		await expect(textField).toHaveText(randomCountry);
	});
});
