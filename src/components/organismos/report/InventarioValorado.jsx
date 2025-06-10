import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
import React from "react";
import styled from "styled-components";
import { useProductoStore } from "../../../store/ProductoStore";
import { useEmpresaStore } from "../../../store/EmpresaStore";
import { useQuery } from "@tanstack/react-query";

export const InventarioValorado = () => {
  const { inventarioValorado } = useProductoStore();
  const { dataEmpresa } = useEmpresaStore();
  const { data } = useQuery({
    queryKey: ["reporte producto valorado", { _id_empresa: dataEmpresa?.id }],
    queryFn: () => inventarioValorado({ _id_empresa: dataEmpresa?.id }),
    enabled: !!dataEmpresa,
  });

  const totalGeneral = data?.reduce((acc, val) => acc + val.total, 0);

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
        {rowData.stock}
      </Text>
      <Text style={[styles.cell, isHeader && styles.headerCell]}>
        {rowData.preciocompra}
      </Text>
      <Text style={[styles.cell, isHeader && styles.headerCell]}>
        {rowData.total}
      </Text>
    </View>
  );
  return (
    <Container>
      <PDFViewer style={{ width: "100%", height: "90vh" }}>
        <Document title="Reporte de stock todos">
          <Page size="A4" orientation="portrait">
            <View style={styles.page}>
              <View style={styles.section}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "ultrabold",
                    marginBottom: 10,
                  }}
                >
                  Inventario Valorado
                </Text>
                <Text>Fecha y Hora del Reporte: {formatDate}</Text>
                <Text>Valor Total: ${totalGeneral}</Text>
                <View style={styles.table}>
                  {renderTableRow(
                    {
                      descripcion: "Producto",
                      stock: "Stock",
                      preciocompra: "Precio compra",
                      total: "Total",
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
`;
