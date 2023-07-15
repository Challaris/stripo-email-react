import { useEffect } from "react";
import { initStripo, loadDemoTemplate } from "./stripoConfig/stripo.helper";

const Stripo = () => {
	const handlePreviewBtnClick = () => {
		window.StripoApi.compileEmail((error, html, ampHtml) => {
			window.ExternalPreviewPopup.openPreviewPopup(html, ampHtml);
		});
	};

	useEffect(() => {
		loadDemoTemplate(initStripo);

		const previewButton = document.querySelector("#previewButton");
		previewButton.addEventListener("click", handlePreviewBtnClick);

		return () => {
			previewButton.removeEventListener("click", handlePreviewBtnClick);
		};
	}, []);

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
