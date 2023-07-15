function stripoApiRequest(method, url, data, callback) {
	var req = new XMLHttpRequest();
	req.onreadystatechange = function () {
		if (req.readyState === 4 && req.status === 200) {
			callback(req.responseText);
		} else if (req.readyState === 4 && req.status !== 200) {
			console.error("Can not complete request. Please check you entered a valid PLUGIN_ID and SECRET_KEY values");
		}
	};
	req.open(method, url, true);
	if (method !== "GET") {
		req.setRequestHeader("content-type", "application/json");
	}
	req.send(data);
}

export function initStripo(options) {
	const apiRequestData = {
		emailId: 123,
	};
	const script = document.createElement("script");
	script.id = "stripoScript";
	script.type = "text/javascript";
	script.src = "https://plugins.stripo.email/static/latest/stripo.js";
	script.onload = function () {
		window.Stripo.init({
			unSubscribeLink: "http://unsubscribe.com",
			socialNetworks: [
				{
					name: "twitter",
					href: "https://twitter.com/my-twitter",
				},
				{
					name: "facebook",
					href: "https://facebook.com/my-facebook",
				},
			],
			mergeTags: [
				{
					category: "Default",
					entries: [
						{
							label: "First Name",
							value: "*|FNAME|*",
						},
					],
				},
			],
			specialLinks: [
				{
					category: "eSputnik",
					entries: [
						{ label: "Unsubscribe", value: "https://esputnik.com/unsubscribe" },
						{
							label: "View in browser",
							value: "https://esputnik.com/viewInBrowser",
						},
					],
				},
				{
					category: "Other",
					entries: [
						{
							label: "Some special link",
							value: "https://some.special.link.url",
						},
					],
				},
			],
			settingsId: "stripoSettingsContainer",
			previewId: "stripoPreviewContainer",
			codeEditorButtonId: "codeEditor",
			undoButtonId: "undoButton",
			redoButtonId: "redoButton",
			locale: "en",
			html: options.html,
			css: options.css,
			apiRequestData: apiRequestData,
			userFullName: "Plugin Demo User",
			versionHistory: {
				changeHistoryLinkId: "changeHistoryLink",
				onInitialized: function (lastChangeIndoText) {
					console.log({ lastChangeIndoText });
					// eslint-disable-next-line no-undef
					$("#changeHistoryContainer").show();
					// document.getElementById('changeHistoryContainer')
				},
			},
			getAuthToken: function (callback) {
				stripoApiRequest(
					"POST",
					"https://plugins.stripo.email/api/v1/auth",
					JSON.stringify({
						pluginId: import.meta.env.VITE_STRIPO_PLUGIN_ID,
						secretKey: import.meta.env.VITE_STRIPO_SECRET_KEY,
					}),
					function (data) {
						callback(JSON.parse(data).token);
					}
				);
			},
		});
	};
	document.body.appendChild(script);
}

export function loadDemoTemplate(callback) {
	stripoApiRequest(
		"GET",
		"https://raw.githubusercontent.com/ardas/stripo-plugin/master/Public-Templates/Basic-Templates/Trigger%20newsletter%20mockup/Trigger%20newsletter%20mockup.html",
		null,
		function (html) {
			stripoApiRequest(
				"GET",
				"https://raw.githubusercontent.com/ardas/stripo-plugin/master/Public-Templates/Basic-Templates/Trigger%20newsletter%20mockup/Trigger%20newsletter%20mockup.css",
				null,
				function (css) {
					callback({ html, css });
				}
			);
		}
	);
}
