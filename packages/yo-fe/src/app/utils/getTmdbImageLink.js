// todo test url parts before construct the link
const getImageLink = ({ image, baseUrl, width }) => `${baseUrl}/${width}${image}`;

export default getImageLink;
