import { exPreviewPopup, exVideoLirary, extCustomFont, externalImgLib, externalLinkEventPopup } from "./libs";

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
			externalVideosLibrary: {
				buttonText: "Pick up my video",
				open: window.ExternalVideosLibrary,
			},
			externalImagesLibrary: window.ExternalImagesLibrary,
			// externalFilesLibrary: {
			// 	buttonText: "Pick up my file",
			// 	open: window.ExternalFilesLibrary,
			// },
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
			canBeSavedToLibrary: function (moduleHtml) {
				//Disable to save as modules all containers/structures/stripes that contain image blocks
				if (moduleHtml.indexOf("esd-block-image") > -1) {
					// show notifications if needed
					// notifications.error('Image blocks can not be saved as modules');
					console.log("Image blocks can not be saved as modules");
					return false;
				}
				return true;
			},
			ignoreClickOutsideSelectors: [
				"#externalPopupContainer",
				"#externalImagesLibrary",
				"#externalFileLibrary",
				"#externalDisplayConditionsPopup",
				"#externalFileLibrary",
			],
			externalLinkControlConfiguration: {
				getMarkup: function () {
					return (
						'<div class="form-group">' +
						'   <div class="col-xs-12">' +
						'       <label for="eventIdControl">Event ID:</label>' +
						'       <span id="eventIdControl" style="font-weight: bold"></span>' +
						"   </div>" +
						'   <div class="col-xs-12">' +
						'       <button id="customizeLinkEventId" class="btn btn-success btn-block">' +
						"           Customize" +
						"       </button>" +
						"   </div>" +
						"</div>"
					);
				},
				onRendered: function (getLinkDomElement, getControlDomContainer, applyChangesCallback) {
					const customizeButton = getControlDomContainer().querySelector("#customizeLinkEventId");
					customizeButton.addEventListener(
						"click",
						function () {
							window.PopupLinksSettings.openPopup(getLinkDomElement(), function () {
								applyChangesCallback();
								getControlDomContainer().querySelector("#eventIdControl").innerHTML =
									getLinkDomElement().getAttribute("event-id");
							});
						}.bind(this)
					);
				},
				updateControlValues: function (getLinkDomElement, getControlDomContainer) {
					getControlDomContainer().querySelector("#eventIdControl").innerHTML =
						getLinkDomElement().getAttribute("event-id");
				},
			},
			// conditionsEnabled: true,
			// customConditionsEnabled: true,
			// conditionCategories: [
			// 	{
			// 		type: "EXTERNAL",
			// 		category: "Complex conditions",
			// 		openExternalDisplayConditionsDialog: window.ExternalDisplayConditions.openExternalDisplayConditionsDialog,
			// 	},
			// 	{
			// 		type: "PREDEFINED",
			// 		category: "Gender",
			// 		conditions: [
			// 			{
			// 				id: "1",
			// 				name: "Men",
			// 				description: "Men only",
			// 				beforeScript: "<!-- %IF in_array('men', $CATEGORY) -->",
			// 				afterScript: "<!-- %/IF% -->",
			// 			},
			// 			{
			// 				id: "2",
			// 				name: "Women",
			// 				description: "Women only",
			// 				beforeScript: "<!-- %IF in_array('women', $CATEGORY) -->",
			// 				afterScript: "<!-- %/IF% -->",
			// 			},
			// 		],
			// 	},
			// ],
			externalCustomFont: window.ExternalCustomFont,
			addCustomFontTitle: "Add custom font",
			editorFonts: {
				showDefaultStandardFonts: true,
				showDefaultNotStandardFonts: true,
				customFonts: [
					{
						name: "Oswald",
						fontFamily: "'Oswald', 'helvetica neue', helvetica, arial, sans-serif",
						url: "https://fonts.googleapis.com/css?family=Oswald",
					},
					{
						name: "Barriecito",
						fontFamily: "'Barriecito', cursive",
						url: "https://fonts.googleapis.com/css?family=Barriecito&display=swap",
					},
				],
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
	window.ExternalPreviewPopup = exPreviewPopup();
	window.ExternalVideosLibrary = exVideoLirary();
	window.PopupLinksSettings = externalLinkEventPopup();
	window.ExternalImagesLibrary = externalImgLib();
	// window.ExternalFilesLibrary = externalFileLib();
	// window.ExternalDisplayConditions = extDisplayConditions();
	window.ExternalCustomFont = extCustomFont(); //This is for paid plans
}
