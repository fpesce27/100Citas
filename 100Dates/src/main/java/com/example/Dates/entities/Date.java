package com.example.Dates.entities;

import com.sun.istack.NotNull;

import javax.persistence.*;
import java.util.List;

@Entity
public class Date{
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    @Column(name = "id", nullable = false)
    private Long id;

    @NotNull
    @Column(name = "name")
    private String name;

    @NotNull
    @Column(name = "horario")
    private Horarios horario;

    @NotNull
    @Column(name = "planeacion")
    private boolean planeacion_previa;

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    private boolean deleted = Boolean.FALSE;

    public boolean isDeleted() {
        return deleted;
    }

    public void setDeleted(boolean deleted) {
        this.deleted = deleted;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Horarios getHorario() {
        return horario;
    }

    public void setHorario(Horarios horario) {
        this.horario = horario;
    }

    public boolean isPlaneacion_previa() {
        return planeacion_previa;
    }

    public void setPlaneacion_previa(boolean planeacion_previa) {
        this.planeacion_previa = planeacion_previa;
    }
}
