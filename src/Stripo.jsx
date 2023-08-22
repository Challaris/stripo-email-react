import { useEffect, useState } from "react";
import { initStripo, loadDemoTemplate } from "./stripoConfig/stripo.helper";
import { templateList } from "./utils";

const Stripo = () => {
	const [currentTemplate, setCurrentTemplate] = useState(templateList[5]);

	useEffect(() => {
		const { cssTemplate, htmlTemplate } = currentTemplate;

		loadDemoTemplate(initStripo, { htmlTemplate, cssTemplate, emailId: 123 }, () => console.log("Loaded"));

		return () => {
			window.StripoApi?.stop();
		};
	}, [currentTemplate]);

	const handlePreviewBtnClick = () => {
		window.StripoApi.compileEmail((error, html, ampHtml) => {
			window.ExternalPreviewPopup.openPreviewPopup(html, ampHtml);
		});
	};

	const handleSaveEmailToDB = () => {
		// get raw html css of the email
		window.StripoApi.getTemplate((html, css, width, height) => {
			console.log({ html, css, width, height });
		});

		// Get the juiced html format of the email
		window.StripoApi.compileEmail((error, html, ampHtml, ampErrors) => {
			console.log({ error, html, ampHtml, ampErrors });
		});
	};

	const handleTemplateChange = (e) => {
		const value = e.target.value;
		const newTemplate = templateList.find((template) => template.title === value);
		setCurrentTemplate(newTemplate);
	};

	return (
		<div className="stripo">
			<div id="externalSystemContainer">
				{/* <!--This is external system container where you can place plugin buttons --> */}
				<button type="button" id="saveButton" className="control-button" onClick={handleSaveEmailToDB}>
					Save
				</button>
				<button type="button" id="undoButton" className="control-button">
					Undo
				</button>
				<button type="button" id="redoButton" className="control-button">
					Redo
				</button>
				<button type="button" id="codeEditor" className="control-button">
					Code editor
				</button>
				<button type="button" id="previewButton" className="control-button" onClick={handlePreviewBtnClick}>
					Preview
				</button>
				<span id="changeHistoryContainer" style={{ display: "none" }}>
					Last change: <a id="changeHistoryLink"></a>
				</span>
				<select
					name="select-template"
					id="select-template"
					onChange={handleTemplateChange}
					value={currentTemplate.title}
				>
					{templateList.map((template) => (
						<option selected={template.title === currentTemplate.title} key={template.title} value={template.title}>
							{template.title}
						</option>
					))}
				</select>
			</div>
			<div className="notification-zone"></div>
			<div>
				{/* <!--Plugin containers --> */}
				<div id="stripoSettingsContainer">Loading...</div>
				<div id="stripoPreviewContainer"></div>
			</div>
		</div>
	);
};

export default Stripo;
