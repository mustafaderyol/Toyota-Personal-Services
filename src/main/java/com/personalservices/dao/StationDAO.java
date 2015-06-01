package com.personalservices.dao;

import com.personalservices.entity.Station;
import org.springframework.stereotype.Component;
import javax.persistence.Query;

import java.util.List;

/* Component anotasyonu yönetimli nesne anlamına gelmektedir */
@Component
public class StationDAO extends BaseDAO<Station>{
    public StationDAO() {
        super(Station.class);
    }

    public List<Station> getRouteToStation(int route_id){
        return entityManager.createQuery("FROM Station st WHERE st.route_id="+route_id).getResultList();
    }

}
