package com.uet.project.model;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Setter
@Getter
@Table(name="store")
public class Store {
    public static enum STORE_TYPE {
        FOOD_PRODUCTION,
        FOOD_SERVICE
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="store_id", nullable = false)
    private int store_id;

    @Column(name="name", nullable = false)
    private String name;

    @Column(name="phone", nullable = false)
    private String phone;

    @Column(name="type", nullable = false)
    private STORE_TYPE type;

    @Column(name="address")
    private String address;

    // certificate
    @OneToMany(mappedBy = "store")
    private Set<Certificate> certificates;

}
