import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
import React, { useState } from "react";
import styled from "styled-components";
import { useProductoStore } from "../../../store/ProductoStore";
import { useEmpresaStore } from "../../../store/EmpresaStore";
import { useQuery } from "@tanstack/react-query";
import { Buscador } from "../Buscador";
import { ListaGenerica } from "../ListaGenerica";

export const KardexEntradaSalidas = () => {
  const [stateList, setStateList] = useState(false);
  const {
    buscarProducto,
    buscador,
    setBuscador,
    selectProducto,
    reporteKardex,
    productoItemSelect,
  } = useProductoStore();
  const { dataEmpresa } = useEmpresaStore();

  const { data } = useQuery({
    queryKey: ["reporte kardex", { id_empresa: dataEmpresa?.id }],
    queryFn: async () =>
      reporteKardex({
        _id_empresa: dataEmpresa?.id,
        _id_producto: productoItemSelect?.id,
      }),
    enabled: !!dataEmpresa && !!productoItemSelect?.id,
  });
  const { data: buscarData } = useQuery({
    queryKey: [
      "buscar producto reporte",
      { _id_empresa: dataEmpresa?.id, buscador: buscador },
    ],
    queryFn: async () => {
      const result = await buscarProducto({
        _id_empresa: dataEmpresa?.id,
        buscador: buscador,
      });
      return result ?? [];
    },
    enabled: dataEmpresa?.id != null,
  });

  const styles = StyleSheet.create({
    page: {
      flexDirection: "row",
      backgroundColor: "#E4E4E4",
      position: "relative",
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
    table: {
      width: "100%",
      margin: "auto",
      marginTop: 10,
    },
    row: {
      flexDirection: "row",
      borderBottom: 1,
      borderBottomColor: "#121212",
      borderLeftColor: "#000",
      borderLeft: 1,
      height: 24,
      justifyContent: "flex-start",
      alignItems: "center",
    },
    cell: {
      flex: 1,
      textAlign: "center",
      fontFamily: "Courier",
      borderLeftColor: "#000",
      justifyContent: "center",
      alignItems: "center",
    },
    headerCell: {
      flex: 1,
      backgroundColor: "#dcdcdc",
      fontWeight: "bold",
      fontFamily: "Courier",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
    },
  });

  const currentDate = new Date();
  const formatDate = `${currentDate.toLocaleDateString()} - ${currentDate.toLocaleTimeString()} hs`;

  const renderTableRow = (rowData, isHeader = false) => (
    <View style={styles.row} key={rowData.id}>
      <Text style={[styles.cell, isHeader && styles.headerCell]}>
        {rowData.descripcion}
      </Text>
      <Text style={[styles.cell, isHeader && styles.headerCell]}>
        {rowData.tipo}
      </Text>
      <Text style={[styles.cell, isHeader && styles.headerCell]}>
        {rowData.fecha}
      </Text>
      <Text style={[styles.cell, isHeader && styles.headerCell]}>
        {rowData.cantidad}
      </Text>
      <Text style={[styles.cell, isHeader && styles.headerCell]}>
        {rowData.detalle}
      </Text>
    </View>
  );
  return (
    <Container>
      <Buscador
        setBuscador={setBuscador}
        accion={() => setStateList(!stateList)}
      />
      {stateList && (
        <ListaGenerica
        bottom="500px"
          funcion={selectProducto}
          setState={() => setStateList(!stateList)}
          data={buscarData}
        />
      )}
      <PDFViewer style={{ width: "100%", height: "90vh" }}>
        <Document title="Reporte de stock todos">
          <Page size="A4" orientation="landscape">
            <View style={styles.page}>
              <View style={styles.section}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "ultrabold",
                    marginBottom: 10,
                  }}
                >
                  Kardex Entradas y Salidas
                </Text>
                <Text>Fecha y Hora del Reporte: {formatDate}</Text>
                <View style={styles.table}>
                  {renderTableRow(
                    {
                      descripcion: "Producto",
                      tipo: "Tipo mov.",
                      fecha: "Fecha",
                      cantidad: "Cantidad",
                      detalle: "Detalle",
                    },
                    true
                  )}
                  {data?.map((item) => renderTableRow(item))}
                </View>
              </View>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
