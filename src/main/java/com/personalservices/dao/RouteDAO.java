package com.personalservices.dao;

import com.personalservices.entity.Route;
import org.springframework.stereotype.Component;

import java.util.List;

/* Component anotasyonu yönetimli nesne anlamına gelmektedir */
@Component
public class RouteDAO extends BaseDAO<Route>{
    public RouteDAO() {
        super(Route.class);
    }

    public List<Route> getRouteTypeAndCityToRoute(int city_id, int route_type_id){
        return entityManager.createQuery("FROM Route rt WHERE rt.city_id="+city_id+" and rt.route_type_id="+route_type_id).getResultList();
    }

}
