# Mermaid Architecture Icons Reference

## Built-in Icons

### Infrastructure Icons
- `(cloud)` - Cloud or group container
- `(server)` - Server or service
- `(database)` - Database
- `(disk)` - Storage
- `(internet)` - Internet/External Network

### Usage Examples
```mermaid
architecture-beta
service cloud_example(cloud)[Cloud Service]
service server_example(server)[Web Server]
service db_example(database)[Database]
service storage_example(disk)[Storage]
service internet_example(internet)[Internet]
```

## Icon Combinations

### Web Services
```mermaid
architecture-beta
group web_tier(cloud)[Web Tier]
    service lb(server)[Load Balancer]
    service web1(server)[Web Server 1]
    service web2(server)[Web Server 2]
end
```

### Data Services
```mermaid
architecture-beta
group data_tier(cloud)[Data Tier]
    service primary(database)[Primary DB]
    service replica(database)[Replica DB]
    service cache(database)[Cache]
end
```

## Icon Selection Guidelines

1. **Server Icons (server)**
   - Web servers
   - Application servers
   - API servers
   - Service instances

2. **Database Icons (database)**
   - Relational databases
   - NoSQL databases
   - Cache systems
   - Data warehouses

3. **Cloud Icons (cloud)**
   - Service groups
   - Cloud regions
   - Virtual networks
   - Container groups

4. **Storage Icons (disk)**
   - File storage
   - Block storage
   - Object storage
   - Backup systems

5. **Internet Icons (internet)**
   - External networks
   - Public endpoints
   - CDN services
   - Third-party services

## Best Practices for Icon Usage

1. **Consistency**
   - Use the same icon type for similar components
   - Maintain consistent naming with icons
   - Group similar icons together

2. **Clarity**
   - Don't overuse icons
   - Use appropriate icons for the component type
   - Keep icon labels clear and concise

3. **Grouping**
   - Use cloud icons for logical grouping
   - Nest groups appropriately
   - Use consistent group icons

4. **Layout**
   - Align similar icons
   - Maintain consistent spacing
   - Consider visual hierarchy

## Common Icon Patterns

### Load Balanced Web Servers
```mermaid
architecture-beta
service lb(server)[Load Balancer]
service web1(server)[Web Server 1]
service web2(server)[Web Server 2]

lb:B --> T:web1
lb:B --> T:web2
```

### Database Cluster
```mermaid
architecture-beta
service primary(database)[Primary]
service replica1(database)[Replica 1]
service replica2(database)[Replica 2]

primary:R --> L:replica1
primary:R --> L:replica2
```

### Storage System
```mermaid
architecture-beta
service app(server)[Application]
service cache(database)[Cache]
service storage(disk)[Storage]

app:B --> T:cache
app:B --> T:storage
``` 