package com.personalservices.dao;

import com.personalservices.entity.City;
import org.springframework.stereotype.Component;

/* Component anotasyonu yönetimli nesne anlamına gelmektedir */
@Component
public class CityDAO extends BaseDAO<City>{
    public CityDAO() {
        super(City.class);
    }

}
