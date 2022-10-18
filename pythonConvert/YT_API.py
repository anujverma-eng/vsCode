from googleapiclient.discovery import build
from openpyxl import Workbook
 
wb=Workbook()
 
sh1= wb.active
 
youTubeApiKey="AIzaSyB7Sptbh5ZuZ12LH65FBezYWikt13qKqlQ" #Input your youTubeApiKey
youtube=build('youtube','v3',developerKey=youTubeApiKey)
 
channelId=['UCnur2E-ASjZp8rHy7Pp8idA','UC3HS6gQ79jjn4xHxogw0HiA','UCpIy5ql-mY-8Kj7z9paz5tA','UCezVg4O_jFPWRp3WABa0INQ','UCi-J9CCaQ8w427GPHmoQGHA','UCN7Uweqdmlpj7RZ7S2dfhnw','UC3HS6gQ79jjn4xHxogw0HiA','UCxpcK4N3jyQ26N5JOvxdfeQ','UCdCc9hWwyuYYaQvtVKQ1lGA','UCi-J9CCaQ8w427GPHmoQGHA','UCwHgfZY4QUKsofu2p7JXD5g','UCVg_Ey3vMm98KMKQya_haTg','UCIJ_q2-8depM3ayoh20801w','UCnur2E-ASjZp8rHy7Pp8idA','UC3HS6gQ79jjn4xHxogw0HiA','UC3HS6gQ79jjn4xHxogw0HiA','UC3HS6gQ79jjn4xHxogw0HiA','UCutgWeL4J7GqsyhZxLDgguA','UC3HS6gQ79jjn4xHxogw0HiA','UCu25NSQuKiC1kqHp83zc0iw','UCt00VncrJhMkOyPRd5GvLKw','UC3HS6gQ79jjn4xHxogw0HiA','UC3HS6gQ79jjn4xHxogw0HiA','UCJaFjzUuHsdZFtGun7P9OnA','UCt00VncrJhMkOyPRd5GvLKw','UC3HS6gQ79jjn4xHxogw0HiA','UCX8yG54IL7E845_Hls1vt-g','UCutgWeL4J7GqsyhZxLDgguA','UCt00VncrJhMkOyPRd5GvLKw','UCoClvOacbQeOsH2zVKEB09g','UC3HS6gQ79jjn4xHxogw0HiA','UC3HS6gQ79jjn4xHxogw0HiA','UCnRAMJhTu7s77QjkJcYpAcQ','UCsqqJ5iBlmzVVOv1b2W4SSw','UCutgWeL4J7GqsyhZxLDgguA','UCAZiVpzu6oHHLcBQixHH0yg','UC3HS6gQ79jjn4xHxogw0HiA','UCud-qHWBJbBytc08LW59vSQ','UC_eQdd44Zo7wEqF7cOFzEBg','UC6XTIVq86zJPKNeiPay1czQ','UCEsTW5WJe-wZ2SP_zlwp8yQ','UCutgWeL4J7GqsyhZxLDgguA','UCutgWeL4J7GqsyhZxLDgguA','UC2_OKzexrMJYWtTtrRc6fVQ','UCMIgfomhGEqdWVMAzU5i13w','UCrTKRd1F1Ql_61JIEb5BOvA','UC67mMD2O8utwFptPz4D_z6w','UCQ60JFypHS_hvZadpnjdGbQ','UCu25NSQuKiC1kqHp83zc0iw','UCrC8mOqJQpoB7NuIMKIS6rQ']
 
l1=[("Channel Id","View Count","Subscriber Count","Video Count")]
 
l1=[("Channel Id","View Count","Video Count","Subscriber Count")]
for i in channelId:
    snippetdata=youtube.channels().list(part='statistics',id=i).execute()
    stats= snippetdata['items'][0]["statistics"]
    temp1=[]
 
    temp1.append(i)
 
    viewCount=stats['viewCount'] 
    temp1.append(viewCount)
 
 
    videoCount=stats['videoCount']
    temp1.append(videoCount)
 
    try:
        subsCount=stats['subscriberCount']
        temp1.append(subsCount)
    except:
        temp1.append("Not Available")
 
    tup1=tuple(temp1)
 
    l1.append(tup1)
 
 
for i in l1:
    sh1.append(i)
 
wb.save("Report.xlsx")