
from tkinter import *
import tkinter.messagebox
import sqlite3
from tkinter import ttk

conn = sqlite3.connect('database.db')
cur = conn.cursor()

class UpdateAccount:
	def __init__(self, master):
		self.master = master

		self.update_client_main_frame = Frame(self.master, width=750, height=600, bg="#6EB5C0")
		self.update_client_main_frame.place(x=350, y=20)

		# Top frame for the heading
		self.top_frame = Frame(self.update_client_main_frame, bg="#FA6775", height=50, width=800)
		self.top_frame.place(x=0, y=0)
		self.main_label = Label(self.top_frame, text="Select Client To Update", bg='#FA6775', font=('FootLight MT light', 20),
						   fg="white")
		self.main_label.place(x=200, y=0)

		# #search criteria-->name
		self.name = Label(self.update_client_main_frame, text="Select clients Name", font=('FootLight MT light', 16), bg="#6EB5C0")
		self.name.place(x=20, y=70)

		#Search Button
		self.search = Button(self.update_client_main_frame, text="Search", width=12, font=('FootLight MT light', 14),
							 height=1, bg='steelblue', command=self.search)
		self.search.place(x=570, y=68)

		## Text Variable to hold user name selected from the drop down list(combo box)
		self.user_name_to_update = StringVar()

		self.nameChosen = ttk.Combobox(self.update_client_main_frame, width=20, font=('FootLight MT light', 14),
									   textvariable=self.user_name_to_update)
		self.nameChosen.place(x=280, y=72)

		# Query The database for user names
		self.query = "SELECT name FROM client"
		self.result = cur.execute(self.query)
		self.final = self.result.fetchall()
		self.new = list()

		for i in range(len(self.final)):
			self.new += self.final[i]

		for self.names in range(len(self.final)):
			self.nameChosen["values"] = self.new
			self.nameChosen.current()
			
	# Function to search
	def search(self):

		self.hold_name = self.user_name_to_update.get()
		if self.user_name_to_update.get() == '':  # or self.hold_name != str(self.name):
			tkinter.messagebox.showerror("sorry", 'Select correct client name to update')
			self.nameChosen.set("")
			return
		
		else:
			query = "SELECT * FROM client WHERE name LIKE ?"
			self.result2 = cur.execute(query, (self.hold_name,))
			for self.row in self.result2:
				self.name = self.row[0]
				self.subdivision = self.row[1]
				self.email = self.row[2]
				self.id_number = self.row[3]
				self.phone = self.row[4]
				self.date = self.row[5]

		#Creating the update form
		self.full_name_label = Label(self.update_client_main_frame, text="client Name", font=('FootLight MT light', 16), bg="#6EB5C0")
		self.full_name_label.place(x=80, y=180)

		self.subdivision_label = Label(self.update_client_main_frame, text="Subdivision", font=('FootLight MT light', 16), bg="#6EB5C0")
		self.subdivision_label.place(x=80, y=220)

		self.email_label = Label(self.update_client_main_frame, text="Email", font=('FootLight MT light', 16), bg="#6EB5C0")
		self.email_label.place(x=80, y=260)

		self.id_number_label = Label(self.update_client_main_frame, text="ID Number", font=('FootLight MT light', 16), bg="#6EB5C0")
		self.id_number_label.place(x=80, y=300)

		self.phone_number_label = Label(self.update_client_main_frame, text="Phone Number", font=('FootLight MT light', 16), bg="#6EB5C0")
		self.phone_number_label.place(x=80, y=340)

		self.date_label = Label(self.update_client_main_frame, text="Date", font=('FootLight MT light', 16), bg="#6EB5C0")
		self.date_label.place(x=80, y=380)


		#Entry for each of them==========================
		#=========filling the result in the entry box to update

		self.full_name_entry = Entry(self.update_client_main_frame, width=25, font=('FootLight MT light', 14),)
		self.full_name_entry.place(x=300, y=180)
		self.full_name_entry.insert(END, str(self.name))


		self.subdivision_entry = Entry(self.update_client_main_frame, width=25, font=('FootLight MT light', 14))
		self.subdivision_entry.place(x=300, y=220)
		self.subdivision_entry.insert(END, str(self.subdivision))


		self.email_entry = Entry(self.update_client_main_frame, width=25, font=('FootLight MT light', 14))
		self.email_entry.place(x=300, y=260)
		self.email_entry.insert(END, str(self.email))

		self.id_number_entry = Entry(self.update_client_main_frame, width=25, font=('FootLight MT light', 14))
		self.id_number_entry.place(x=300, y=300)
		self.id_number_entry.insert(END, str(self.id_number))

		self.phone_number_entry = Entry(self.update_client_main_frame, width=25, font=('FootLight MT light', 14))
		self.phone_number_entry.place(x=300, y=340)
		self.phone_number_entry.insert(END, str(self.phone))

		self.date_entry = Entry(self.update_client_main_frame, width=25, font=('FootLight MT light', 14))
		self.date_entry.place(x=300, y=380)
		self.date_entry.insert(END, str(self.date))


		#Button to execute the update
		self.update_button = Button(self.update_client_main_frame, text="Update user", width=12, font=('FootLight MT light', 12),
							 height=2, bg='lightblue', command=self.update_client_info)
		self.update_button.place(x=470, y=460)

		#Button to delete.
		self.delete_button = Button(self.update_client_main_frame, text="Delete user", width=12, font=('FootLight MT light', 12),
							 height=2, bg='red', command=self.delete_client_info)
		self.delete_button.place(x=280, y=460)

		#cancel button
		self.cancel_button = Button(self.update_client_main_frame, text="Cancel", width=10,
									font=('FootLight MT light', 12),
									height=1, bg='#FA6775', command=self.cancel)
		self.cancel_button.place(x=140, y=467)



	##This functions clear the widgets on the update user frame after updating and deleting user info
	def clear_widgets(self):

		self.full_name_entry.destroy()
		self.subdivision_entry.destroy()
		self.email_entry.destroy()
		self.id_number_entry.destroy()
		self.phone_number_entry.destroy()
		self.date_entry.destroy()

		self.full_name_label.destroy()
		self.subdivision_label.destroy()
		self.email_label.destroy()
		self.id_number_label.destroy()
		self.phone_number_label.destroy()
		self.date_label.destroy()

		self.update_button.destroy()
		self.delete_button.destroy()
		self.cancel_button.destroy()

		self.nameChosen.set("")

	def update_client_info(self):
		#Declearing the variables to update
		self.hold_full_name      = self.full_name_entry.get()
		self.hold_subdivision    = self.subdivision_entry.get()
		self.hold_email          = self.email_entry.get()
		self.hold_id_number      = self.id_number_entry.get()
		self.hold_phone_number   = self.phone_number_entry.get()
		self.hold_date           = self.date_entry.get()

		# if self.full_name_entry == '':
		# 	tkinter.messagebox.showinfo("Attention!!!", "Are you sure you want a user with no name?")


		self.query2 = "UPDATE client SET name=?, subdivision=?, email=?, id_number=?, phone=?, date=? WHERE name LIKE ?"
		self.run = cur.execute(self.query2, (self.hold_full_name , self.hold_subdivision, self.hold_email,
								self.hold_id_number, self.hold_phone_number, self.hold_date, self.full_name_entry.get()))

		tkinter.messagebox.showinfo("Success", " Information for  "+ str(self.hold_name)+"  has been updated")

		self.clear_widgets()




	def delete_client_info(self):
		delete_client = tkinter.messagebox.askyesno("Check this!!!", "Delete Client " + str(self.nameChosen.get()) + "?")
		if delete_client > 0:
			query3 = "DELETE FROM  client WHERE name LIKE ? "
			cur.execute(query3, (self.full_name_entry.get(), ))
			conn.commit()
			tkinter.messagebox.showinfo("Success", "User information successfully deleted")

		self.clear_widgets()

	def cancel(self):
		cancel_inputs = tkinter.messagebox.askyesno("Check this!!!", "Cancel inputs?? ")
		if cancel_inputs > 0:
			self.clear_widgets()
		else:
			pass


# #Creating the object
# window = Tk()
# b = UpdateAccount(window)
# window.geometry("1200x720+80+30")
# #window.resizable(False, False)
# #window.overrideredirect(True)
# window.mainloop()

