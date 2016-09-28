using System.Collections.Generic;

public interface IContactRepsository
{
    List<Contact> GetAll();
    void AddContact(Contact contact);
    Contact GetContactById(int id);
    void UpdateContact(Contact contact);
}