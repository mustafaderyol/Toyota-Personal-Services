package com.personalservices.dao;

import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;


/* Component anotasyonu yönetimli nesne anlamına gelmektedir */
@Component
public class BaseDAO<T>{
    Class<T> className;

    /* Entity Manager nesnesi */
    @PersistenceContext
    protected EntityManager entityManager;

    public BaseDAO() {
    }
    
    public BaseDAO(Class<T> className) {
        this.className=className;
    }

    public T findByID(int id){
        return (T)entityManager.find(className,id);
    }

    public List<T> findAll(){
        return entityManager.createQuery("FROM "+ className.getName()).getResultList();
    }

    public void save(T entity){
        entityManager.persist(entity);
    }

    public void delete(T entity){
        entityManager.remove(entity);
    }

    public void merge(T entity){

        entityManager.merge(entity);
    }
    
}
