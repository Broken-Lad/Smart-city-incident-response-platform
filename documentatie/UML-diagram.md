```mermaid
classDiagram
    class Incident {
        +String incidentnaam
        +Long id
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

    Incident --> Categorie : heeft
    Incident --> Threatlevel : heeft
```