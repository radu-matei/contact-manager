using System;

public class Contact
{
    private static Random _random = new System.Random();

    public int Id { get;set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string PhoneNumber { get; set; }

    public Contact(string firstName, string lastName, string email, string phoneNumber)
    {
      Id = _random.Next(1,100);
      FirstName = firstName;
      LastName = lastName;
      Email = email;
      PhoneNumber = phoneNumber;
    }

    public Contact()
    {
    }
}