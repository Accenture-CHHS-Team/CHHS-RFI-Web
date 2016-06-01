# CALParent API

This

## Roles
The following dynamic roles exist:


## Schema
The following entities compose the CALParent application:

Identity : User
A login identity with an optional link to a single Person.
- Properties:
--
- Relations
-- personidentity : hasOne PersonIdentity on identityId

Person
A single CRM-style person record.
- Properties:
--
- Relations:
-- personidentity : hasOne PersonIdentity on personId
-- connections : hasMany to CaseConnection on personId
-- postaladdresses : hasMany to PostalAddress on personId
-- cases : hasMany to Case on clientPersonId

PersonIdentity
Links a Person record to an Identity on login, with an arc annotation
indicating the kind of role the 
- Properties:
--
- Relations:
--

PostalAddress

Comfort

Facility

Case

CaseConnection

CaseComfort

CaseFacilityFacade

MailThread

MailMessage
