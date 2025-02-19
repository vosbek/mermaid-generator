# Mermaid Architecture Patterns

## Common Architecture Patterns

### 1. Three-Tier Architecture
```mermaid
architecture-beta
group presentation(cloud)[Presentation Tier]
    service web(server)[Web Server]
end
group application(cloud)[Application Tier]
    service app(server)[App Server]
end
group data(cloud)[Data Tier]
    service db(database)[Database]
end

web:B --> T:app
app:B --> T:db
```

### 2. Microservices Architecture
```mermaid
architecture-beta
group api_gateway(cloud)[API Layer]
    service gateway(server)[API Gateway]
end
group services(cloud)[Microservices]
    service auth(server)[Auth Service]
    service users(server)[User Service]
    service orders(server)[Order Service]
end
group data(cloud)[Data Layer]
    service auth_db(database)[Auth DB]
    service user_db(database)[User DB]
    service order_db(database)[Order DB]
end

gateway:B --> T:auth
gateway:B --> T:users
gateway:B --> T:orders
auth:B --> T:auth_db
users:B --> T:user_db
orders:B --> T:order_db
```

### 3. Event-Driven Architecture
```mermaid
architecture-beta
group producers(cloud)[Event Producers]
    service web(server)[Web App]
    service mobile(server)[Mobile App]
end
group processing(cloud)[Event Processing]
    service queue(server)[Message Queue]
    service processor(server)[Event Processor]
end
group storage(cloud)[Storage]
    service db(database)[Database]
end

web:R --> L:queue
mobile:R --> L:queue
queue:R --> L:processor
processor:B --> T:db
```

## Best Practices

1. **Group Related Components**
   - Use meaningful group names
   - Nest groups when logical
   - Keep hierarchy shallow (max 3 levels)

2. **Connection Guidelines**
   - Use clear directional flows
   - Avoid crossing lines when possible
   - Use appropriate edge types

3. **Naming Conventions**
   - Use descriptive service names
   - Keep names concise
   - Use consistent naming patterns

4. **Icon Usage**
   - Use appropriate icons for services
   - Be consistent with icon usage
   - Don't overuse icons

## Common Anti-Patterns to Avoid

1. **Deep Nesting**
   - Avoid more than 3 levels of nesting
   - Keep groups focused and logical

2. **Messy Connections**
   - Avoid too many crossing lines
   - Use intermediate nodes if needed
   - Consider regrouping components

3. **Inconsistent Styling**
   - Stick to one icon style
   - Use consistent naming
   - Maintain consistent grouping patterns 