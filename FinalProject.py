from tkinter import *
import tkinter as tk
from tkinter import ttk
import tkinter.messagebox
import tkinter.filedialog

from create_account import CreateAccount
from update import UpdateAccount
from     finalFile import ProcessFile

class Page(Frame):
    def __init__(self, *args, **kwargs):
        Frame.__init__(self, *args, **kwargs)
        Frame.configure(self)
    def show(self):
        self.lift()

class Login(Page):
    def __init__(self, *args, **kwargs):
        Page.__init__(self, *args, **kwargs)
       

class Home(Page):
    def __init__(self, *args, **kwargs):
        Page.__init__(self, *args, **kwargs)
    
	   
class AddClient(Page):
    def __init__(self, *args, **kwargs):
        Page.__init__(self, *args, **kwargs)
        
    

class ProcessFile(Page):
    def __init__(self, *args, **kwargs):
        Page.__init__(self, *args, **kwargs)
       
        

class UpdateClient(Page):
    def __init__(self, *args, **kwargs):
        Page.__init__(self, *args, **kwargs)
        
        
# class ErrorPage(Page):
#     def __init__(self, *args, **kwargs):
#         Page.__init__(self, *args, **kwargs)
#

class MainView(Frame):
    def __init__(self, *args, **kwargs):
        Frame.__init__(self, *args, **kwargs)
        loginpage         = Login(self, bg="black")
        homepage          = Home(self, bg="black")
        addclientpage     = AddClient(self, bg="black")
        processfilepage   = ProcessFile(self, bg="black")
        updateclientpage  = UpdateClient(self, bg="black")
        # errorpage     = ErrorPage(self)
        
       
        buttonframe   = Frame(self, bg="#375E97")
        container     = Frame(self)
        buttonframe.pack(side="top", fill="x", expand=False)
        container.pack(side="top", fill="both", expand=True)
        

        loginpage.place(in_=container, x=0, y=0, relwidth=1, relheight=1)
        homepage.place(in_=container, x=0, y=0, relwidth=1, relheight=1)
        addclientpage.place(in_=container, x=0, y=0, relwidth=1, relheight=1)
        processfilepage.place(in_=container, x=0, y=0, relwidth=1, relheight=1)
        updateclientpage.place(in_=container, x=0, y=0, relwidth=1, relheight=1)
        # errorpage.place(in_=container, x=0, y=0, relwidth=1, relheight=1)
        
        
        ###### Buttons########################################################
        
        def back_to_home():
            homepage.show()
        

        expand_frame = Button(buttonframe, text="",
                                  font=('FootLight MT light', 14) ,  bg="#375E97", fg="#375E97")
        expand_frame.pack(side="left")
        
        #### TOP BAR LABEL
        top_bar_label = Label(buttonframe, text="Land Survey File Processing For Land Certificates", bg="#375E97",
                              font=('Times New Roman', 18, "bold"), fg="white")
        top_bar_label.place(x=400, y=0)

        def add_more_client():
            create_account = CreateAccount(master=addclientpage)
            addclientpage.show()
            return  create_account.add_client_to_system


        def update_more_client():
            update_account = UpdateAccount(master=updateclientpage)
            updateclientpage.show()
            return update_account.search


        def process_more_files():
            process_file = ProcessFile(master=processfilepage)
            processfilepage.show()
            return process_file.open

        home_button = tk.Button(addclientpage, text="Home", font=('FootLight MT light', 14),
                                command=back_to_home, width=10, bg="#EFEFEF", fg="#375E97")
        home_button.place(x=10,y=5)

        home_button1 = tk.Button(updateclientpage, text="Home", font=('FootLight MT light', 14),
                                command=back_to_home,width=10, bg="#EFEFEF", fg="#375E97")
        home_button1.place(x=10, y=5)

        home_button2 = tk.Button(processfilepage, text="Home", font=('FootLight MT light', 14),
                                 command=back_to_home, width=10, bg="#EFEFEF", fg="#375E97")
        home_button2.place(x=10, y=5)

        
        
        ################### LOGIN FUNCTION ##################
        name     = StringVar()
        password = StringVar()

        
        def login_admin():
            value1     = (admin_name_entry.get())
            value2    = admin_password_entry.get()
            if value1 == "admin" and value2 == "admin":
                homepage.lift()
            else:
                tkinter.messagebox.showinfo("INPUT ERROR", "Name or Password Invalid")


        def logout():
            exit_message = tkinter.messagebox.askyesno("You are about to Logout","Back to Login?")
            if exit_message > 0:
                loginpage.lift()
                return

        def exit_application():
            exit_message = tkinter.messagebox.askyesno("You are about to close this application?", "Close Application?")
            if exit_message > 0:
                root.destroy()
                return
      
      

        ################## BEGIN ADMIN LOGIN FORM ###################################

        login_frame = Frame(loginpage, width=400, height=350, bg="#6EB5C0")
        login_frame.place(x=450, y=170)

        # Top frame for the heading
        login_top_frame = Frame(login_frame, bg="#FA6775", height=50, width=700)
        login_top_frame.place(x=0, y=0)
        admin_main_label = Label(login_top_frame, text="Admin Login", bg='#FA6775', font=('FootLight MT light', 20),
                           fg="white")
        admin_main_label.place(x=140, y=0)
        
        ## Admin Labels
        
        #admin name
        admin_name_label = Label(login_frame, text="Name", font=('FootLight MT light', 16), fg='black',
                                bg='#6EB5C0')
        admin_name_label.place(x=150, y=80)

        # admin password
        admin_password_label = Label(login_frame, text="Password", font=('FootLight MT light', 16), fg='black',
                                  bg='#6EB5C0')
        admin_password_label.place(x=150, y=160)
        
        
        #Name and password Entries
        admin_name_entry = Entry(login_frame, width=25, font=('Times New Roman', 14), textvariable=name )
        admin_name_entry.place(x=90, y=120)

        admin_password_entry = Entry(login_frame, width=25, font=('Times New Roman', 14),
                                     textvariable=password, show="*" )
        admin_password_entry.place(x=90, y=200)

        admin_login_button = Button(login_frame, text="Login", bd=2, bg="steelblue", fg="white", command=login_admin,
                             font=('Times New Roman', 14, "bold"), width=10, height=1)
        admin_login_button.place(x=200, y=250)

        admin_exit_button = Button(login_frame, text="Exit", bd=1, bg="#FA6775", fg="white",
                                    font=('Times New Roman', 14), width=9, height=1, command=exit_application)
        admin_exit_button.place(x=80, y=253)


        ################## END OF ADMIN LOGIN #####################################
        
        
        ################ HOME PAGE DESIGNS    #########################

        home_page_main_frame = Frame(homepage, width=700, height=600, bg="#6EB5C0")
        home_page_main_frame.place(x=350, y=20)

        # Top frame for the heading
        home_top_frame = Frame(home_page_main_frame, bg="#FA6775", height=50, width=700)
        home_top_frame.place(x=0, y=0)
        main_label = Label(home_top_frame, text="Select Task To Perform", bg='#FA6775', font=('FootLight MT light', 20),
                           fg="white")
        main_label.place(x=200, y=0)

        add_client_frame = Frame(home_page_main_frame, bg="#375E97", height=60, width=400)
        add_client_frame.place(x=150, y=100)

        proces_file_frame = Frame(home_page_main_frame, bg="#375E97", height=60, width=400)
        proces_file_frame.place(x=150, y=200)

        update_client_frame = Frame(home_page_main_frame, bg="#375E97", height=60, width=400)
        update_client_frame.place(x=150, y=300)


        ### Butons For The Individual Tasks

        add_client_task_button = tk.Button(add_client_frame, text="Add Client", command=add_more_client,
                                           font=('Times New Roman', 16), width=18, bg="white", fg="#375E97")
        add_client_task_button.place(x=100, y=10)

        proces_file_task_button = tk.Button(proces_file_frame, text="Process File", command=process_more_files,
                                           font=('Times New Roman', 16), width=18, bg="white", fg="#375E97")
        proces_file_task_button.place(x=100, y=10)

        update_client_task_button = tk.Button(update_client_frame, text="Update Client", command=update_more_client,
                                           font=('Times New Roman', 16), width=18, bg="white", fg="#375E97")
        update_client_task_button.place(x=100, y=10)

        logout_application_button = Button(home_page_main_frame, text="Logout", bd=1, bg="#FA6775", fg="white",
                                   font=('Times New Roman', 14), width=14, height=1, command=logout)
        logout_application_button.place(x=540, y=560)

        
        ############END HOME PAGE DESIGNS ##########################


        
        ############ PROCESS FILE DESIGNS ########################

        # process_file_main_frame = Frame(processfile, width=700, height=600, bg="#6EB5C0")
        # process_file_main_frame.place(x=350, y=20)
        #
        # # Top frame for the heading
        # process_file_top_frame = Frame(process_file_main_frame, bg="#FA6775", height=50, width=700)
        # process_file_top_frame.place(x=0, y=0)
        # process_file_main_label = Label(process_file_top_frame, text="Select Client To Process File", bg='#FA6775', font=('FootLight MT light', 20),
        #                    fg="white")
        # process_file_main_label.place(x=200, y=0)
        #
        # process_file_instruct_label = Label(process_file_main_frame, text="Select Below", font=('FootLight MT light', 18, "bold", "italic"), bg="#6EB5C0" )
        # process_file_instruct_label.place(x=260, y=80)
        #
        # client_chosen = ttk.Combobox(process_file_main_frame, width=20, font=('FootLight MT light', 18))
        # client_chosen.place(x=200, y=180)
        #
        # # Button to upload file
        #
        # upload_file_button = Button(process_file_main_frame, text='Upload File', bd=2, bg="#FA6775", fg="white",
        #                             font=('Times New Roman', 16, "bold"), width=23, height=1)
        # upload_file_button.place(x=200, y=330)
        #
        # ## Back To the home page button
        # back_to_home_button = Button(process_file_main_frame, text="Back to Home", command=home.lift,
        #                              font=('FootLight MT light', 14), bg="#EFEFEF", fg="blue")
        # back_to_home_button.place(x=570, y=560)

        ############ END OF PROCESS FILE DESIGNS ########################

        processfilepage.show()
        #loginpage.show()
        


if __name__ == "__main__":
    root = Tk()
    main = MainView(root)
    main.pack(side="top", fill="both", expand=True)
    root.title("")
    root.geometry("1200x400")
    root.mainloop()

