package com.uet.project.model;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Setter
@Getter
@Table(name="asessment")
@EqualsAndHashCode
    public class Assessment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="asessment_id", nullable = false)
    private int id;

    @Column(name="code_sample")
    private String codeSample;

    @Column(name="name_sample")
    private String nameSample;

    @Column(name="status")
    private boolean status;

    @Column(name="date_reiceive")
    private Date dateReceive;

    @Column(name="result")
    private String result;


    //action
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="action_id", nullable = false)
    private Action doAction;

    //inspection
    @OneToOne(mappedBy = "assessment")
    @JoinColumn(name = "inspection_id", referencedColumnName = "asessment_id")
    private Inspection inspection;


}
