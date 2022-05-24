package com.uet.project.model;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Setter
@Getter
@Table(name="certificate")

public class Certificate {

    public static enum CERTIFICATE_TYPE {
        GRANTE,
        RECALL,
        EXPAND
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="certificate_id", nullable = false)
    private int certificate_id;

    @Column(name="dated", nullable = false)
    private Date dated;

    @Column(name="expiration_date", nullable = false)
    private Date expirationDate;

    @Column(name="type", nullable = false)
    private CERTIFICATE_TYPE type;

    //store
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="store_id", nullable = false)
    private Store store;



    //action
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="action_id", referencedColumnName = "certificate_id")
    private Action actionEachCerti;

}
