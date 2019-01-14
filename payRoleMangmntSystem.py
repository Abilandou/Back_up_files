
import datetime
from tkinter import *
import time
from tkinter import messagebox

root = Tk()
root.title("Pay Roll System")
root.geometry("1350x650+0+0")

#=========== All Frames==============

Tops = Frame(root, width=1350, height=10, bd=3, bg="yellow", relief="raise")
Tops.pack(side=TOP)
f1 = Frame(root, width=600, height=1000, bd=8, bg="lime", relief="raise")
f1.pack(side=LEFT)
f2 = Frame(root, width=80, height=600, bd=8, bg="green", relief="raise")
f2.pack(side=RIGHT)
fla = Frame(f1, width=600, height=200, bd=10, bg="blue",  relief="raise")
fla.pack(side=TOP)
flb = Frame(f1, width=600, height=600, bd=10, relief="raise")
flb.pack(side=TOP)

#============== The Title =========================
lblinfo = Label(Tops, font=('Times New Roman', 35, 'bold'),fg="black", text="  Payment Management Systems  ", bd=10  )
lblinfo.grid(row=0, column=0)

##=============== All Functions ===========================

def iExit():
    qExit = messagebox.askyesno("Payroll System", "Do you want to exit the system")#A  prompt asking the user if hewants to exit the application
    if qExit > 0:
        root.destroy()
        return

def Reset():
    Name.set("")
    Address.set("")
    HoursWorked.set("")
    wageshour.set("")
    Payable.set("")
    Taxable.set("")
    NetPayable.set("")
    GrossPayable.set("")
    OvertimeHours.set("")
    Employer.set("")
    NINumber.set("")
    txtPaySlip.delete("1.0", END)
    return


def EnterInfo(): #Information that will appear on the pay slip
    txtPaySlip.insert(END, "\t\tPay Slip\n\n")
    txtPaySlip.insert(END, "Name: \t\t"+ Name.get() +"\n\n")
    txtPaySlip.insert(END, "Address: \t\t" + Address.get() + "\n\n")
    txtPaySlip.insert(END, "Employer: \t\t" + Employer.get() + "\n\n")
    txtPaySlip.insert(END, "NI Number: \t\t" + NINumber.get() + "\n\n")
    txtPaySlip.insert(END, "Hours Worked: \t\t"+ HoursWorked.get() +"\n\n")
    txtPaySlip.insert(END, "Net Payable: \t\t" + NetPayable.get() + "\n\n")
    txtPaySlip.insert(END, "Wages per hour: \t\t" + wageshour.get() + "\n\n")
    txtPaySlip.insert(END, "Tax Paid: \t\t" + Taxable.get() + "\n\n")
    txtPaySlip.insert(END, "Payable: \t\t" + Payable.get() + "\n\n")


def WeeklyWages():
    HoursWorkedPerWeek=float(HoursWorked.get())
    WagesPerHours=float(wageshour.get())

    paydue = WagesPerHours * HoursWorkedPerWeek
    PaymentDue = "$", str('%.2f' %(paydue))
    Payable.set(PaymentDue)

    tax = paydue * 0.2
    Taxables = "$", str('%.2f' %(tax))
    Taxable.set(Taxables)

    netpay = paydue - tax
    NetPays = "$", str('%.2f' %(netpay))
    NetPayable.set(NetPays)

    #Check over time conditions

    if HoursWorkedPerWeek > 40:
       overTimeHours = (HoursWorkedPerWeek - 40) + WagesPerHours * 1.5
       Overtimehrs = "$", str('%.2f' %(overTimeHours))
       OvertimeHours.set(Overtimehrs)

    elif HoursWorkedPerWeek <= 40:
         overTimePay = (HoursWorkedPerWeek - 40) + WagesPerHours * 1.5
         Overtimehrs = "$", str('%.2f' %(overTimePay))
         OvertimeHours.set(Overtimehrs)

    return


##==================Variables========================
Name=StringVar()
Address=StringVar()
Employer=StringVar()
HoursWorked=StringVar()
wageshour=StringVar()
NINumber=StringVar()
Payable=StringVar()
NetPayable=StringVar()
GrossPayable=StringVar()
Taxable=StringVar()
OvertimeHours=StringVar()
Timeoforder=StringVar()
Dateoforder=StringVar()

Dateoforder.set(time.strftime("%d/%m/%y"))

#============== All Label Widgets ==========================

lblName = Label(fla, text= "Name", font=('Times New Roman', 16, 'bold'), bd=20).grid(row=0, column=0)
lblAddress = Label(fla, text= "Address", font=('Times New Roman', 16, 'bold'), bd=20).grid(row=0, column=2)
lblEmployer = Label(fla, text= "Employer", font=('Times New Roman', 16, 'bold'), bd=20).grid(row=1, column=0)
lblNumber = Label(fla, text= "NI Number", font=('Times New Roman', 16, 'bold'), bd=20).grid(row=1, column=2)
lblHoursWorked = Label(fla, text= "Hours Worked", font=('Times New Roman', 16, 'bold'), bd=20).grid(row=2, column=0)
lblHourlyRate = Label(fla, text= "Hourly Rate", font=('Times New Roman', 16, 'bold'), bd=20).grid(row=2, column=2)
lblTax = Label(fla, text= "Tax", font=('Times New Roman', 16, 'bold'), bd=20).grid(row=3, column=0)
lblOvertime = Label(fla, text= "OverTime", font=('Times New Roman', 16, 'bold'), bd=20).grid(row=3, column=2)
lblGrossPay = Label(fla, text= "Gross Pay", font=('Times New Roman', 16, 'bold'), bd=20).grid(row=4, column=0)
lblNetPay = Label(fla, text= "Net Pay", font=('Times New Roman', 16, 'bold'), bd=20).grid(row=4, column=2)


#=====================All Entry Widgets=====================

extName = Entry(fla, textvariable=Name, font=('Times New Roman', 16, 'bold'), bd=16, width=22, justify=LEFT)
extName.grid(row=0, column=1)

extAddress = Entry(fla, textvariable=Address, font=('Times New Roman', 16, 'bold'), bd=16, width=22, justify=LEFT)
extAddress.grid(row=0, column=3)

extemployer = Entry(fla, textvariable=Employer, font=('Times New Roman', 16, 'bold'), bd=16, width=22, justify=LEFT)
extemployer.grid(row=1, column=1)

extHoursWorked = Entry(fla, textvariable=HoursWorked, font=('Times New Roman', 16, 'bold'), bd=16, width=22, justify=LEFT)
extHoursWorked.grid(row=2, column=1)

extWagesPerHours = Entry(fla, textvariable=wageshour, font=('Times New Roman', 16, 'bold'), bd=16, width=22, justify=LEFT)
extWagesPerHours.grid(row=2, column=3)

extninoW = Entry(fla, textvariable=NINumber, font=('Times New Roman', 16, 'bold'), bd=16, width=22, justify=LEFT)
extninoW.grid(row=1, column=3)

extGrossPay = Entry(fla, textvariable=Payable, font=('Times New Roman', 16, 'bold'), bd=16, width=22, justify=LEFT)
extGrossPay.grid(row=4, column=1)

extNetPay = Entry(fla, textvariable=NetPayable, font=('Times New Roman', 16, 'bold'), bd=16, width=22, justify=LEFT)
extNetPay.grid(row=4, column=3)

extTax = Entry(fla, textvariable=Taxable, font=('Times New Roman', 16, 'bold'), bd=16, width=22, justify=LEFT)
extTax.grid(row=3, column=1)

extovertime = Entry(fla, textvariable=OvertimeHours, font=('Times New Roman', 16, 'bold'), bd=16, width=22, justify=LEFT)
extovertime.grid(row=3, column=3)


#=================Text Widget =============================
lblPaySlip = Label(f2, textvariable=Dateoforder, font=('Times New Roman', 21, 'bold')).grid(row=0, column=0)
txtPaySlip = Text(f2, height=18, width=30, bd=16, font=('Times New Roman', 12, 'bold'))
txtPaySlip.grid(row=1, column=0)


## =============Buttons ====================================
btnSalary = Button(flb, text='Weekly Salary', command=WeeklyWages,padx=16, bg="blue", pady=16, bd=8, fg="black", font=('Times New Roman', 16, 'bold'), width=14, height=1).grid(row=0, column=0)
btnReset = Button(flb, text='Reset', command=Reset, padx=16, pady=16,bg="grey", bd=8, fg="black", font=('Times New Roman', 16, 'bold'), width=14, height=1).grid(row=0, column=1)
btnPaySlip = Button(flb, text='View Payslip', command=EnterInfo, padx=16,bg="sea green", pady=16, bd=8, fg="black", font=('Times New Roman', 16, 'bold'), width=14, height=1).grid(row=0, column=2)
btnExit = Button(flb, text='Exit System', command=iExit, padx=16, pady=16, bd=8, bg="red", fg="black", font=('Times New Roman', 16, 'bold'), width=14, height=1).grid(row=0, column=3)


root.mainloop()