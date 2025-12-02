```mermaid
classDiagram
    class Incident {
        +String incidentnaam
        +Long id
        +Localdate date
        +Status status
    }

    class Categorie {
        <<enumeration>> 
        Weer
        Verkeer
        Misdaad
    }

    class Threatlevel {
        <<enumeration>>
        Low
        Medium
        High
    }

    class Status {
        <<enumiration>>
        Ongoing
        Resolved
        Planned
    }

    Incident --> Categorie : heeft
    Incident --> Threatlevel : heeft
    Incident --> Status : heeft
```