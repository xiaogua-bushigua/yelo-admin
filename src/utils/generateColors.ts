const colors = [
	'#D0104C',
	'#F8C3CD',
	'#64363C',
	'#B5495B',
	'#FEDFE1',
	'#CB4042',
	'#734338',
	'#CB4042',
	'#B9887D',
	'#E83015',
	'#D75455',
	'#ED784A',
	'#8F5A3C',
	'#FFBA84',
	'#FFB11B',
	'#FFB11B',
	'#F6C555',
	'#D9CD90',
	'#5B622E',
	'#90B44B',
	'#B5CAA0',
	'#91B493',
	'#7BA23F',
	'#1B813E',
	'#227D51',
	'#6A8372',
	'#66BAB7',
	'#78C2C4',
	'#78C2C4',
	'#33A6B8',
	'#58B2DC',
	'#1E88A8',
	'#51A8DD',
	'#005CAF',
	'#7B90D2',
	'#113285',
	'#4E4F97',
	'#9B90C2',
	'#8F77B5',
	'#66327C',
]

const generateColors = (num: number) => {
  return colors.sort(function () {
    return 0.5 - Math.random();
  }).slice(0, num)
}

export default generateColors