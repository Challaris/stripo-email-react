const getTemplateUrl = (title = "", variant = "", type = "html") => {
	const template = `https://raw.githubusercontent.com/ardas/stripo-plugin/master/Public-Templates/${variant}-Templates/`;
	return encodeURI(`${template}${title}/${title}.${type}`);
};

const generateTemplateList = (title, variant = "Basic") => {
	return {
		title,
		htmlTemplate: getTemplateUrl(title, variant),
		cssTemplate: getTemplateUrl(title, variant, "css"),
	};
};

const remoteTemplateList = [
	{ title: "New-editor-template", variant: "Basic" },
	{ title: "Empty-Template", variant: "Basic" },
	{ title: "1-Column-Template", variant: "Basic" },
	{ title: "2-Column-Template", variant: "Basic" },
	{ title: "Promo newsletter mockup", variant: "Basic" },
	{ title: "Trigger newsletter mockup", variant: "Basic" },
];

export const templateList = remoteTemplateList.map(({ title, variant }) => generateTemplateList(title, variant));
