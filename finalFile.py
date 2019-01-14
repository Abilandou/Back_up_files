from tkinter import *
import tkinter as tk
from tkinter import ttk
import tkinter.messagebox
import tkinter.filedialog

import sqlite3

from update import UpdateAccount

conn = sqlite3.connect('database.db')
cur  = conn.cursor()

class ProcessFile:
    def __init__(self, master):
        self.master = master

        self.process_file_main_frame = Frame(self.master, width=700, height=600, bg="#6EB5C0")
        self.process_file_main_frame.place(x=350, y=20)

        # Top frame for the heading
        self.process_file_top_frame = Frame(self.process_file_main_frame, bg="#FA6775", height=50, width=700)
        self.process_file_top_frame.place(x=0, y=0)
        self.process_file_main_label = Label(self.process_file_top_frame, text="Select Client To Process File", bg='#FA6775',
                                        font=('FootLight MT light', 20), fg="white")
        self.process_file_main_label.place(x=200, y=0)

        self.process_file_instruct_label = Label(self.process_file_main_frame, text="Select Below",
                                            font=('FootLight MT light', 18, "bold", "italic"), bg="#6EB5C0")
        self.process_file_instruct_label.place(x=260, y=80)

        self.upload_file_button = Button(self.process_file_main_frame, text='Upload File', bd=2, bg="#FA6775", fg="white",
                                         font=('Times New Roman', 16, "bold"), width=23, height=1, command=self.open)
        self.upload_file_button.place(x=200, y=330)
        
        ######## String variable holding user name to process file#############
        self.user_name_process_file = StringVar()

        self.client_chosen = ttk.Combobox(self.process_file_main_frame, width=20,
                                          font=('FootLight MT light', 18), textvariable=self.user_name_process_file)
        self.client_chosen.place(x=200, y=180)

        # Query The database for user names
        self.query = "SELECT name FROM client"
        self.result = cur.execute(self.query)
        self.final = self.result.fetchall()
        self.new = list()

        for i in range(len(self.final)):
            self.new += self.final[i]

        for self.names in range(len(self.final)):
            self.client_chosen["values"] = self.new
            self.client_chosen.current()
        return
            

    def open(self):
        if True:
            self.input_file_name = tkinter.filedialog.askopenfilename(defaultextension=".txt",
                        filetypes=[("All Files", "*.*"),("Text Documents", "*.txt"), ("Pdf Documents", "*.pdf*")])

            self.file_name = self.input_file_name
            # win.title('{} - {}'.format(os.path.basename(file_name), "Edit"))
            with open(self.file_name) as _file:
                print("This is good man.")
                #self.text_entry.insert(1.0, _file.read())
        

    # def open_file(self):
    #     input_file_name = tkinter.filedialog.askopenfilename(defaultextension=".txt",filetypes=[("All Files", "*.*"),
    #                                                                     ("Text Documents", "*.txt"), ("Pdf Documents", "*.pdf*")])
    #
    #     if input_file_name:
    #         global file_name
    #     file_name = input_file_name
    #     win.title('{} - {}'.format(os.path.basename(file_name), "Edit"))
    #     # text_entry.delete(1.0, END)
    #     with open(file_name) as _file:
    #         # text_entry.insert(1.0, _file.read())
    #         return -file
    #


        # Button to upload file




        ## Text Variable to hold user name selected from the drop down list(combo box)





        # def select(self):
        #     self.hold_name = self.user_name_to_update.get()
        #     if self.user_name_to_update.get() == '':  # or self.hold_name != str(self.name):
        #         tkinter.messagebox.showerror("sorry", 'Select correct client name to update')
        #         self.nameChosen.set("")
        #         return
        #
        #     else:
        #         query = "SELECT * FROM client WHERE name LIKE ?"
        #         self.result2 = cur.execute(query, (self.hold_name,))
        #         for self.row in self.result2:
        #             self.name = self.row[0]
        #             self.subdivision = self.row[1]
        #             self.email = self.row[2]
        #             self.id_number = self.row[3]
        #             self.phone = self.row[4]
        #             self.date = self.row[5]
        #
        #     return
        #
        #


        # def save_file():
        #     if file_detail.get("1.0", "end-1c") == '':
        #         tkinter.messagebox.showerror("Sorry", "Nothing to save")
        #
        #     else:
        #
        #         if True:
        #             file_name = open('file_name.txt', 'w')
        #             for data in file_detail.get("1.0", "end-1c"):
        #                 file_name.writelines(data)
        #
        #             tkinter.messagebox.showinfo('Success', "File Saved Successfully")




#
# if __name__ == "__main__":
#     window = Tk()
#     app = ProcessFile(window)
#     window.geometry("1350x800")
#     window.resizable(False, False)
#     window.configure(bg="black")
#     window.mainloop()
