package com.uet.project.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.uet.project.entity.User;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Setter
@Getter
@Table(name = "store")

public class Store {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "store_id", nullable = false)
    private int store_id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "phone", nullable = false)
    private String phone;

    @Column(name = "type", nullable = false)
    private String type;

    @Column(name = "address", nullable = false)
    private String address;


    @JsonIgnore
    // certificate
    @OneToOne(mappedBy = "store")
    private Certificate certificates;
    @JsonIgnore
    // manytoone vs user,
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name="user_id")
    private User user;
    @JsonIgnore
    // onetoone vs assessment
    @OneToOne(mappedBy = "store")
    private Inspection inspection;

}
