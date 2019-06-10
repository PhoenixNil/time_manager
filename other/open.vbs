dim bag,pipe,good,fso,f,a
Set fso = CreateObject("Scripting.FileSystemObject")
Set f=fso.OpenTextFile("temp.txt",1)
a= "select * from win32_process where name='"+f.ReadLine()+"'"
do
good="."
set bag=getobject("winmgmts:\\"&good&"\root\cimv2")
set pipe=bag.execquery(a)
for each i in pipe
i.terminate()
next
wscript.sleep 1000
loop
