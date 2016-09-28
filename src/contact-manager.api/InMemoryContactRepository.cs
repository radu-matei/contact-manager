using System.Collections.Generic;
using System.Linq;

public class InMemoryContactRepository : IContactRepsository
{
    private List<Contact> _contacts = new List<Contact>()
    {
        new Contact("Obi-Wan", "Kenobi", "obi@wan-kenobi.com", "1234"),
        new Contact("Darth", "Vader", "darth@vader.com", "5678")
    };

    public void AddContact(Contact contact)
    {
        _contacts.Add(contact);
    }

    public List<Contact> GetAll()
    {
        return _contacts;
    }

    public Contact GetContactById(int id)
    {
        return _contacts.FirstOrDefault(contact => contact.Id == id);
    }
}