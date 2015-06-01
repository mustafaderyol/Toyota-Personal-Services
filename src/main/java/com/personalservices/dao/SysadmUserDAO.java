package com.personalservices.dao;

import com.personalservices.entity.SysadmUser;
import org.springframework.stereotype.Component;

/* Component anotasyonu yönetimli nesne anlamına gelmektedir */
@Component
public class SysadmUserDAO extends BaseDAO<SysadmUser>{
    public SysadmUserDAO() {
        super(SysadmUser.class);
    }

    public SysadmUser checkLogin (String name, String password) {
        SysadmUser user = new SysadmUser();
        user = (SysadmUser)entityManager.createQuery(" FROM SysadmUser s WHERE s.username='" + name + "'and s.password='"+password+"'").getSingleResult();
        return user;
    }

}
