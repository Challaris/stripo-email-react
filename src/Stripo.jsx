import { useEffect, useState } from "react";
import { initStripo, loadDemoTemplate } from "./stripoConfig/stripo.helper";
import { templateList } from "./utils";

const Stripo = () => {
	const [currentTemplate, setCurrentTemplate] = useState(templateList[5]);

	const handlePreviewBtnClick = () => {
		window.StripoApi.compileEmail((error, html, ampHtml) => {
			window.ExternalPreviewPopup.openPreviewPopup(html, ampHtml);
		});
	};

	useEffect(() => {
		const { cssTemplate, htmlTemplate } = currentTemplate;

		loadDemoTemplate(initStripo, { htmlTemplate, cssTemplate });

		const previewButton = document.querySelector("#previewButton");
		previewButton.addEventListener("click", handlePreviewBtnClick);

		return () => {
			previewButton.removeEventListener("click", handlePreviewBtnClick);
			window.StripoApi?.stop();
		};
	}, [currentTemplate]);

	const handleTemplateChange = (e) => {
		const value = e.target.value;
		const newTemplate = templateList.find((template) => template.title === value);
		setCurrentTemplate(newTemplate);
	};

	return (
		<div className="stripo">
			<div id="externalSystemContainer">
				{/* <!--This is external system container where you can place plugin buttons --> */}
				<button id="undoButton" className="control-button">
					Undo
				</button>
				<button id="redoButton" className="control-button">
					Redo
				</button>
				<button id="codeEditor" className="control-button">
					Code editor
				</button>
				<button id="previewButton" className="control-button">
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
