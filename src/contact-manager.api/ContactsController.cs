using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

public class ContactsController : Controller
{
    private IContactRepsository _contacts { get; set; }

    public ContactsController(IContactRepsository contacts)
    {
        _contacts = contacts;
    }

    [HttpGet]
    public List<Contact> GetContacts()
    {
        return _contacts.GetAll();
    }

    [HttpPost]
    public void AddContact(Contact contact)
    {
        _contacts.AddContact(contact);
    }
}