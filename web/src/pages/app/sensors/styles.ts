import styled from "styled-components"

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`

export const Header = styled.header`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;
`

export const GraphAndListContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr; 
    gap: 1rem;
    padding: 1rem;
`;

export const TableContainer = styled.div`
    display: flex;
    align-items: flex-start;
    margin-top: 1rem;
`

export const GraphContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
    width: 100%;
    height: 500px;
    padding: 1rem;
`

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    margin-top: 1rem;

    th {
        background-color: transparent;
        color: #333;
        font-weight: bold;
        min-width: 100px; 
        min-height: 30px;
    }

    th, td {
        padding: 1rem 0.5rem; 
        text-align: start;
        min-width: 100px; 
        border-bottom: 1px solid #ddd;
    }
    
    tr:nth-child(even) {
        background-color: transparent;
    }
`