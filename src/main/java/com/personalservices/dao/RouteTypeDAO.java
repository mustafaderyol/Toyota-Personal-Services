package com.personalservices.dao;

import com.personalservices.entity.RouteType;
import org.springframework.stereotype.Component;

/* Component anotasyonu yönetimli nesne anlamına gelmektedir */
@Component
public class RouteTypeDAO extends BaseDAO<RouteType>{
    public RouteTypeDAO() {
        super(RouteType.class);
    }

}
