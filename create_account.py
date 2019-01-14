
from tkinter import *
import sqlite3
import time
import tkinter.messagebox



#Connect to the database
conn = sqlite3.connect('database.db')


#Cursur to move around the database
cur = conn.cursor()

class CreateAccount:
	def __init__(self, master):
		self.master = master

		add_client_main_frame = Frame(self.master, width=700, height=600, bg="#6EB5C0")
		add_client_main_frame.place(x=350, y=20)

		#Top frame for the heading
		top_frame = Frame(add_client_main_frame, bg="#FA6775", height=50, width=700)
		top_frame.place(x=0, y=0)
		main_label = Label(top_frame, text="Add Client To System", bg='#FA6775', font=('FootLight MT light', 20), fg="white")
		main_label.place(x=200, y=0)
		#Required label heading
		required_label = Label(add_client_main_frame, text="Required Fields *", fg="#FF4447", bg="#6EB5C0", font=('FootLight MT light', 16, "bold", "italic"))
		required_label.place(x=200, y=60)
		
		
		#################### DEFINITION OF STRING VARIABLES##########################
		self.name          = StringVar()
		self.subdivision   = StringVar()
		self.email         = StringVar()
		self.id_num        = StringVar()
		self.phone         = StringVar()
		self.date          = StringVar()
		self.date_of_today = StringVar()
		
		########################### END VARIABLE DEFINITION ###########################



		# clients name
		self.full_name_label = Label(add_client_main_frame, text="Full Name *", font=('FootLight MT light', 16), fg='black', bg='#6EB5C0')
		self.full_name_label.place(x=50, y=100)

		# clients subdivision
		self.subdivision_label = Label(add_client_main_frame, text="Subdivision *", font=('FootLight MT light', 16), fg='black', bg='#6EB5C0')
		self.subdivision_label.place(x=50, y=140)

		# clients email
		self.email_label = Label(add_client_main_frame, text="Email ", font=('FootLight MT light', 16), fg='black', bg='#6EB5C0')
		self.email_label.place(x=50, y=180)

		# clients ID number
		self.id_number = Label(add_client_main_frame, text="ID Number *", font=('FootLight MT light', 16), fg='black', bg='#6EB5C0')
		self.id_number.place(x=50, y=220)

		# clients Phone
		self.phone_label = Label(add_client_main_frame, text="Phone Number *", font=('FootLight MT light', 16), fg='black', bg='#6EB5C0')
		self.phone_label.place(x=50, y=260)

		# clients date of creation
		self.date_label = Label(add_client_main_frame, text="Date *", font=('FootLight MT light', 16), fg='black', bg='#6EB5C0')
		self.date_label.place(x=50, y=300)

		# ========== All ENTRIES =====================
		self.full_name_entry = Entry(add_client_main_frame, width=30, font=('Times New Roman', 14), textvariable=self.name )
		self.full_name_entry.place(x=250, y=100)

		self.subdivision_entry = Entry(add_client_main_frame, width=30, font=('Times New Roman', 14), textvariable=self.subdivision)
		self.subdivision_entry.place(x=250, y=140)

		self.email_entry = Entry(add_client_main_frame, width=30, font=('Times New Roman', 14), textvariable=self.email)
		self.email_entry.place(x=250, y=180)

		self.id_number_entry = Entry(add_client_main_frame, width=30, font=('Times New Roman', 14), textvariable=self.id_num)
		self.id_number_entry.place(x=250, y=220)

		self.phone_entry = Entry(add_client_main_frame, width=30, font=('Times New Roman', 14), textvariable=self.phone)
		self.phone_entry.place(x=250, y=260)

		self.date_entry = Entry(add_client_main_frame, width=30, font=('Times New Roman', 14), textvariable=self.date_of_today)
		self.date_entry.place(x=250, y=300)

		self.todays_date_button = Button(add_client_main_frame, text="today's date", bd=2, bg="lightblue", fg="black",
		                     font=('Times New Roman', 12), width=13, height=1, command=self.date_today)
		self.todays_date_button.place(x=550, y=300)

		self.add_client_button = Button(add_client_main_frame, text="Save information", width=15, height=1, bd=2, bg='steelblue', fg="white",
		                            font=('FootLight MT light', 14), command=self.add_client_to_system)
		self.add_client_button.place(x=400, y=370)
		
		self.cancel_button = Button(add_client_main_frame, text="Cancel", width=10, height=1, bd=2, bg='#FA6775', fg="white",
		                            font=('FootLight MT light', 12), command=self.clear_widgets)
		self.cancel_button.place(x=275, y=372)



	#################### FUNCTIONS############################
	
	def clear_widgets(self):
		self.name.set(" ")
		self.subdivision.set(" ")
		self.email.set(" ")
		self.id_num.set(" ")
		self.phone.set(" ")
		self.date.set("")
		self.date_of_today.set(" ")
		
	

	def add_client_to_system(self):
		#Getting the user input
		self.name_holder         = self.full_name_entry.get()
		self.subdivision_holder  = self.subdivision_entry.get()
		self.email_holder        = self.email_entry.get()
		self.id_num_holder       = self.id_number_entry.get()
		self.phone_holder        = self.phone_entry.get()
		self.date_holder         = self.date_entry.get()

		# Checking if the user input is empty
		if self.name_holder == '' or self.subdivision_holder == '' and self.email_holder =='' \
				or self.id_num_holder =='' or self.phone_holder =='' or self.date_holder=='':
			tkinter.messagebox.showwarning("", "Warning all fields are required")

			return
		else:

			#++++++==== Add data to database =+++===
			query = "INSERT INTO 'client' (name, subdivision, email, id_number, phone, date) VALUES(?, ?, ?, ?, ?, ?)"
			cur.execute(query, (self.name_holder, self.subdivision_holder, self.email_holder,
			                     self.id_num_holder, self.phone_holder, self.date_holder))
			conn.commit()
			tkinter.messagebox.showinfo("Success", "Account " +str(self.name_holder) +" has been created" + ' on '+ str(self.date_holder))
		
		self.clear_widgets()
		
		
		
	def date_today(self):
		self.date_of_today.set(time.strftime("%y-%m-%d"))
		return



####################END OF FUNCTIONS######################
