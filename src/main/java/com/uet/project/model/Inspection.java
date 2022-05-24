package com.uet.project.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name="inspection")
@Setter
@Getter
public class Inspection {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="inspection_id", nullable = false)
    private int inspection_id;

    @Column(name="name", nullable = false)
    private String name;

    @Column(name="address", nullable = false)
    private String address;


    // assessment
    @OneToOne(cascade = CascadeType.ALL)
    private Assessment assessment;

}
