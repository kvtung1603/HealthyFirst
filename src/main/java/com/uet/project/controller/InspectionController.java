package com.uet.project.controller;

import com.uet.project.model.Inspection;
import com.uet.project.model.Store;
import com.uet.project.service.InspectionService;
import com.uet.project.service.StoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class InspectionController {
    @Autowired
    private InspectionService inspectionService;

    @Autowired
    private StoreService storeService;

    @GetMapping("/find/inspection/pending")
    public ResponseEntity<List<Map<String, String>>> findInspectionPending() {
        List<Inspection> lst = inspectionService.findInspectionByStatus("PENDING");
        List<Map<String, String>> rst = new ArrayList<>();
        for (Inspection inspection : lst) {
            Map<String, String> map = new HashMap<String, String>();
            map.put("name", inspection.getName());
            map.put("address", inspection.getStore().getAddress());
            map.put("result", inspection.getResult());
            map.put("username", inspection.getStore().getUser().getUsername());
            rst.add(map);
        }
        return ResponseEntity.ok(rst);
    }

    @GetMapping("/find/inspection/inprocess")
    public ResponseEntity<List<Map<String, String>>> findInspectionInprocess() {
        List<Inspection> lst = inspectionService.findInspectionByStatus("INPROCESS");
        List<Map<String, String>> rst = new ArrayList<>();
        for (Inspection inspection : lst) {
            Map<String, String> map = new HashMap<String, String>();
            map.put("name", inspection.getName());
            map.put("address", inspection.getStore().getAddress());
            map.put("result", inspection.getResult());
            map.put("username", inspection.getStore().getUser().getUsername());
            rst.add(map);
        }
        return ResponseEntity.ok(rst);
    }

    @PostMapping("/create-inspection/{store_id}")
    public Store createInspection(@PathVariable int store_id, @RequestParam Inspection inspection) {
        Store store = storeService.findStoreById(store_id);
        store.setInspection(inspection);
        return storeService.save(store);
    }

    @PutMapping("/update-inspection/{inspection_id}")
    public void updateInspection(@PathVariable int inspection_id, @RequestParam String result) {
        Inspection inspection = inspectionService.findById(inspection_id);
        inspection.setResult(result);

    }
}
