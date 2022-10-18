#from pdf2image import convert_from_path
#poppler_path=r'C:\Users\Welcome\Downloads\poppler\poppler-22.04.0\Library\bin'
#pdfPath=r'E:\Visual Studio Code - All Code\CroppingDataset-master\test.p


# from pdf2image import convert_from_path
# poppler_path=r'C:\Users\Welcome\Downloads\poppler\poppler-22.04.0\Library\bin'

# images = convert_from_path("test.pdf", 500,poppler_path)
# for i, image in enumerate(images):
#     fname = 'image'+str(i)+'.png'
#     image.save(fname, "PNG")
import fitz
pdf = fitz.open('test.pdf')
page = pdf.load_page(0)
pix = page.get_pixmap()
pix.save('output.png')