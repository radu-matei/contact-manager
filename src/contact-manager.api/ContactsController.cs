using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR.Infrastructure;

public class ContactsController : Controller
{
    private IContactRepsository _contacts { get; set; }
    private IConnectionManager _connectionManager { get; set; }

    public ContactsController(IContactRepsository contacts, IConnectionManager connectionManager)
    {
        _contacts = contacts;
        _connectionManager = connectionManager;
    }

    [HttpGet]
    public List<Contact> GetContacts()
    {
        return _contacts.GetAll();
    }

    [HttpGet]
    public Contact GetContactById([FromQuery]int id)
    {
        return _contacts.GetContactById(id);
    }

    [HttpPost]
    public void AddContact(Contact contact)
    {
        _contacts.AddContact(contact);
    }

    [HttpPost]
    public void UpdateContact([FromBody]Contact contact)
    {
        _contacts.UpdateContact(contact);
        _connectionManager.GetHubContext<ContactsHub>().Clients.All.updateContact(contact);

    }
}